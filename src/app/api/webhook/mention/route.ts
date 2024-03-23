import { DOMAIN } from "@/config";
import { getCoordinatesFromUrl } from "@/lib/helpers";
import { replyCast } from "@/lib/neynar";
import { prisma } from "@/lib/prisma";
import { extractUrls } from "@/lib/utils";
import { createHmac } from "crypto";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const urlMetadata = require("url-metadata");

export async function POST(request: NextRequest) {
  const neynarSignature = headers().get("x-neynar-signature");

  const rawBody = await request.text();
  const data = JSON.parse(rawBody);

  const hmac = createHmac("sha512", process.env.NEYNAR_WEBHOOK_SIGNATURE!);
  hmac.update(rawBody);

  const generatedSignature = hmac.digest("hex");

  if (generatedSignature !== neynarSignature) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  const { thread_hash, hash, text, timestamp, author, embeds } = data.data;

  const textLinks = extractUrls(text);
  const mapLink = textLinks.filter((i) =>
    i.startsWith("https://maps.app.goo.gl"),
  );
  const mapUrl = mapLink.length > 0 ? mapLink[0] : null;

  if (mapUrl) {
    const metadata = await urlMetadata(mapUrl);
    const coordinates = await getCoordinatesFromUrl(mapUrl);

    const locationInfo = metadata["og:title"].split(",");
    const country = locationInfo[locationInfo.length - 1].trim().toLowerCase();

    const record = await prisma.checkin.create({
      data: {
        parent_hash: thread_hash,
        text,
        timestamp,
        embeds,
        location: metadata["og:title"],
        coordinates,
        country,
        image: metadata["og:image"],
        category: metadata["og:description"].split(" · ")?.[1],
        user: {
          connectOrCreate: {
            where: {
              fid: String(author.fid),
            },
            create: {
              fid: String(author.fid),
              username: author.username,
              display_name: author.display_name,
              pfp_url: author.pfp_url,
            },
          },
        },
      },
    });

    if (record) {
      await replyCast({
        embedUrl: `${DOMAIN}checkin/${record.checkin_id}/${String(author.fid)}`,
        parentId: hash,
      });

      console.log("record");
      console.log(author.verified_addresses.eth_addresses[0]);

      const userWalletAddress = author.verified_addresses.eth_addresses[0]
        ? author.verified_addresses.eth_addresses[0]
        : null;

      try {
        const response = await fetch(`${DOMAIN}/api/check_airdrop`, {
          method: "POST",
          // @ts-ignore
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            key: process.env.MINT_SECRET,
          },
          body: JSON.stringify({
            wallet_address: userWalletAddress,
          }),
        });

        const { token_id } = await response.json();

        if (token_id) {
          await prisma.metadata.create({
            data: {
              token_id: token_id,
              checkin: {
                connect: {
                  checkin_id: record.checkin_id,
                },
              },
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return NextResponse.json(
    {
      message: "Received!",
    },
    { status: 200 },
  );
}
