type PinataData = {
  data: {
    fid: number;
    custody_address: string;
    recovery_address: string;
    following_count: number;
    follower_count: number;
    verifications: string[];
    bio: string;
    display_name: string;
    pfp_url: string;
    username: string;
  };
};

const getUserInfo = async (fid: string) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PINATA_API}`,
    },
  };

  const data = await fetch(
    `https://api.pinata.cloud/v3/farcaster/users/${fid}`,
    options,
  )
    .then((response) => response.json() as unknown as PinataData)
    .catch((err) => null);

  return data;
};

export { getUserInfo };
