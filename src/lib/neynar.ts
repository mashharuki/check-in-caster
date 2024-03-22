const axios = require("axios");

export const replyCast = async ({
  textContents = "Woohoo! Great Check In!",
  embedUrl,
  parentId,
}: {
  textContents?: string;
  embedUrl: string;
  parentId: string;
}) => {
  try {
    const options = {
      method: "POST",
      url: "https://api.neynar.com/v2/farcaster/cast",
      headers: {
        accept: "application/json",
        api_key: process.env.NEYNAR_API_KEY,
        "content-type": "application/json",
      },
      data: {
        signer_uuid: process.env.NEYNAR_SIGNED_UUID,
        text: textContents,
        embeds: [{ url: embedUrl }],
        parent: parentId,
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
