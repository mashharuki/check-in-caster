import Cast from "@/components/app/cast";
import { prisma } from "@/lib/prisma";
import { getVerifiedClaimsWithoutRedirect, privy } from "@/lib/privy";

export default async function Home() {
  const feedData = await prisma.checkin.findMany({
    include: {
      user: true,
    },
  });

  const verifiedClaims = await getVerifiedClaimsWithoutRedirect();
  const user = verifiedClaims
    ? await privy.getUser(verifiedClaims.userId)
    : null;

  const userFarcasterData = user?.farcaster;

  const dummyCasts = [
    {
      object: "cast",
      hash: "0xd15889095cf709a55f2cddbaa392e0c8881fb138",
      author: {
        username: "craig_love",
        display_name: "Martha Craig",
        pfp_url:
          "https://i.pinimg.com/736x/b1/da/8c/b1da8c5e24416e10707453d9908709d8.jpg",
      },
      text: "*East River Park*\nBrooklyn, NY\n\nIt was so relaxing, i will def go there again next year!",
      timestamp: "2024-03-22T04:52:14.000Z",
      embeds: [
        {
          url: "https://i.imgur.com/CXZzllM.png",
        },
      ],
      reactions: {
        likes: [
          {
            fid: 123213,
            fname: "Kieron Dotson",
          },
          {
            fid: 223123,
            fname: "Zack John",
          },
        ],
        recasts: [],
        replies: {
          count: 28,
        },
      },
    },
    {
      object: "cast",
      hash: "0xd15889095cf709a55f2cddbaa392e0c8881fb138",
      author: {
        username: "mis_potter",
        display_name: "Tabitha Potter",
        pfp_url:
          "https://i.pinimg.com/736x/b1/da/8c/b1da8c5e24416e10707453d9908709d8.jpg",
      },
      text: "*East River Park*\nBrooklyn, NY",
      timestamp: "2024-03-22T04:52:14.000Z",
      embeds: [
        {
          url: "https://i.imgur.com/RLeDoO9.png",
        },
      ],
      reactions: {
        likes: [
          {
            fid: 123213,
            fname: "Kieron Dotson",
          },
          {
            fid: 223123,
            fname: "Zack John",
          },
        ],
        recasts: [
          {
            fid: 123213,
            fname: "Kieron Dotson",
          },
        ],
        replies: {
          count: 7,
        },
      },
    },
    {
      object: "cast",
      hash: "0xd15889095cf709a55f2cddbaa392e0c8881fb138",
      author: {
        username: "karenne",
        display_name: "karenne",
        pfp_url:
          "https://i.pinimg.com/736x/b1/da/8c/b1da8c5e24416e10707453d9908709d8.jpg",
      },
      text: "*East River Park*\nBrooklyn, NY",
      timestamp: "2024-03-22T04:52:14.000Z",
      embeds: [
        {
          url: "https://i.imgur.com/ekJLkEC.png",
        },
      ],
      reactions: {
        likes: [
          {
            fid: 223123,
            fname: "Zack John",
          },
        ],
        recasts: [],
        replies: {
          count: 8,
        },
      },
    },
  ];

  return (
    <main className="flex h-full flex-col">
      {feedData.map((cast) => (
        <Cast
          key={cast.parent_hash}
          object={""}
          hash={cast.parent_hash ?? ""}
          author={cast?.user as any}
          text={cast.text ?? ""}
          timestamp={String(cast.timestamp)}
          embeds={
            cast.image
              ? [
                  {
                    url: cast.image ?? "",
                  },
                ]
              : []
          }
          reactions={{
            likes: [],
            recasts: [],
            replies: {
              count: 10,
            },
          }}
        />
      ))}
    </main>
  );
}
