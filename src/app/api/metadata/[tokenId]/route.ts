import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> },
) {
  const tokenId = params.tokenId;

  const metadata = await prisma.metadata.findFirst({
    where: {
      token_id: String(tokenId),
    },
    include: {
      checkin: true,
    },
  });

  if (!metadata) {
    return NextResponse.json(
      {
        name: `Checkin Caster #${tokenId}`,
        description: "",
        external_url: `https://www.checkincaster.xyz/`,
        attributes: [],
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      name: `Checkin Caster ${metadata.checkin.country ? `${metadata.checkin.country}` : `#${tokenId}`}`,
      description: "",
      external_url: `https://www.checkincaster.xyz/`,
      attributes: [],
    },
    { status: 200 },
  );
}
