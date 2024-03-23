import { NextRequest, NextResponse } from "next/server";
const urlMetadata = require("url-metadata");

export async function GET(request: NextRequest) {
  const url = "https://maps.app.goo.gl/2uGkraGQExF6yZcu9";
  const metadata = await urlMetadata(url);

  const locationInfo = metadata["og:title"].split(",");
  const country = locationInfo[locationInfo.length - 1].trim().toLowerCase();

  return NextResponse.json(
    {
      title: metadata["og:title"],
      country: country,
      category: metadata["og:description"].split(" · ")?.[1],
      metadata,
    },
    { status: 200 },
  );
}
