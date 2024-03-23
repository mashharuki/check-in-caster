import { DOMAIN } from "@/config";
import { creditTokens } from "@/lib/contract";
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

    const locationInfo = metadata["og:title"].split(",");
    const country = locationInfo[locationInfo.length - 1].trim().toLowerCase();

    const record = await prisma.checkin.create({
      data: {
        parent_hash: thread_hash,
        text,
        timestamp,
        embeds,
        location: metadata["og:title"],
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
      creditTokens({
        address: author.verified_addresses[0] ?? "",
      });

      await replyCast({
        embedUrl: `${DOMAIN}/checkin/${record.checkin_id}`,
        parentId: hash,
      });
    }
  }

  return NextResponse.json(
    {
      message: "Received!",
    },
    { status: 200 },
  );
}
