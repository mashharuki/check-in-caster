import { getUserInfo } from "@/lib/pinata";
import { prisma } from "@/lib/prisma";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";

// @ts-ignore
const reducer = (state, action) => ({ count: state.count + 1 });

export default async function Home(props: any) {
  const previousFrame = getPreviousFrame(props.searchParams);
  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    fetchHubContext: false,
  });

  const [state, dispatch] = useFramesReducer(reducer, { id: 0 }, previousFrame);

  console.log(props);

  //create bookmark
  if (frameMessage?.buttonIndex === 1) {
    const checkinId = JSON.parse(
      props.searchParams.postBody,
    ).untrustedData.url.split("/")[4];

    const fid = JSON.parse(props.searchParams.postBody).untrustedData.url.split(
      "/",
    )[5];

    console.log(checkinId, fid);
    console.log(JSON.parse(props.searchParams.postBody).untrustedData.url);

    try {
      //check if it exists in the database first
      const bookmark = await prisma.bookmarks.findFirst({
        where: {
          fid: frameMessage.requesterFid.toString(),
          check_in_ref_id: checkinId,
        },
      });

      if (!bookmark) {
        const requesterFarcasterData = await getUserInfo(
          frameMessage.requesterFid.toString(),
        );

        await prisma.bookmarks.create({
          data: {
            checkin: {
              connect: {
                checkin_id: checkinId,
              },
            },
            user: {
              connectOrCreate: {
                where: {
                  fid: String(requesterFarcasterData?.data.fid),
                },
                create: {
                  fid: String(requesterFarcasterData?.data.fid),
                  username: requesterFarcasterData?.data.username,
                  display_name: requesterFarcasterData?.data.display_name,
                  pfp_url: requesterFarcasterData?.data.pfp_url,
                },
              },
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
      return (
        <FrameContainer
          postUrl="/api/frames"
          state={state}
          previousFrame={previousFrame}
          pathname="/checkin/[id]"
        >
          <FrameImage>
            <div tw="flex justify-center items-center">
              Error with Bookmark ops
            </div>
          </FrameImage>
          <FrameButton>Invalid Request</FrameButton>
        </FrameContainer>
      );
    }

    return (
      <FrameContainer
        postUrl="/api/frames"
        state={state}
        previousFrame={previousFrame}
        pathname="/checkin/[id]/[fid]"
      >
        <FrameImage
          src={`https://checkincaster.xyz/api/images/start?cid=${checkinId}`}
        />
        <FrameButton>✅</FrameButton>
        <FrameButton
          action="link"
          target={`https://checkincaster.xyz/profile/${fid}`}
        >
          Profile
        </FrameButton>
      </FrameContainer>
    );
  }

  return (
    <FrameContainer
      postUrl="/api/frames"
      state={state}
      previousFrame={previousFrame}
      pathname="/checkin/[id]/[fid]"
    >
      <FrameImage
        src={`https://checkincaster.xyz/api/images/start?cid=${props.params.id}`}
      />
      <FrameButton>Bookmark</FrameButton>
      <FrameButton
        action="link"
        target={`https://checkincaster.xyz/profile/${props.params.fid}`}
      >
        Profile
      </FrameButton>
    </FrameContainer>
  );
}
