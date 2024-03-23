//@ts-nocheck
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/db';
import { getUserDataForFid } from 'frames.js';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const checkinId: string = searchParams.get('cid');

  const { fid, text, category, image } = await prisma.checkin.findUnique({
    where: {
      checkin_id: checkinId,
    },
  });

  const userData = await getUserDataForFid({ fid });

  return new ImageResponse(
    (
      <div tw='flex flex-row bg-black w-full h-full text-white relative'>
        <img src={image} tw='h-full w-1/2' />
        <div tw='w-1/2 flex flex-col justify-between p-10 py-8'>
          <div tw='flex flex-col'>
            <div tw='flex items-center'>
              <img
                src={userData?.profileImage}
                tw='w-7 h-7 mr-3 rounded-full'
              />
              <h2 tw='text-sm'>{userData?.displayName}</h2>
            </div>
            <h1 tw='mt-1'>Checked in {category}!</h1>
            <p tw='pr-20 -mt-1 text-lg'>
              {text
                .replace('@checkin', '')
                .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')}
            </p>
          </div>
          <div tw='flex flex-col'>
            <h3>Rating</h3>
            <div tw='-mt-3 flex flex-row justify-between w-2/6'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='yellow'
              >
                <path
                  fill-rule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                  clip-rule='evenodd'
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='yellow'
              >
                <path
                  fill-rule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                  clip-rule='evenodd'
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='yellow'
              >
                <path
                  fill-rule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                  clip-rule='evenodd'
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='yellow'
              >
                <path
                  fill-rule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                  clip-rule='evenodd'
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='gray'
              >
                <path
                  fill-rule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                  clip-rule='evenodd'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
