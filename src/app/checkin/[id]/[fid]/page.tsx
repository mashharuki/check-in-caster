//@ts-nocheck
import { prisma } from "@/app/lib/db";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";

const reducer = (state, action) => ({ count: state.count + 1 });

export default async function Home(props) {
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
        await prisma.bookmarks.create({
          data: {
            fid: frameMessage.requesterFid.toString(),
            check_in_ref_id: checkinId,
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
          <FrameButton>✅</FrameButton>
          <FrameButton>More Reviews</FrameButton>
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
          src={`https://checkin-frame.vercel.app/api/images/start?cid=${checkinId}`}
        />
        <FrameButton>✅</FrameButton>
        <FrameButton>More Reviews</FrameButton>
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
        src={`https://checkin-frame.vercel.app/api/images/start?cid=${props.params.id}`}
      />
      <FrameButton>Bookmark</FrameButton>
      <FrameButton>More Reviews</FrameButton>
      <FrameButton
        action="link"
        target={`https://checkincaster.xyz/profile/${props.params.fid}`}
      >
        Profile
      </FrameButton>
    </FrameContainer>
  );
}
