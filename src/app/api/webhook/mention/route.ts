import { prisma } from "@/lib/prisma";
import { extractUrls } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
const urlMetadata = require("url-metadata");

export async function POST(request: NextRequest) {
  const data = await request.json();

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

    const checkin = await prisma.checkin.create({
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
              fid: author.username,
            },
            create: {
              fid: author.fid,
              username: author.username,
              display_name: author.display_name,
              pfp_url: author.pfp_url,
            },
          },
        },
      },
    });

    // use checkin.checkin_id to reply to cast.
  }

  return NextResponse.json(
    {
      message: "Received!",
    },
    { status: 200 },
  );
}
