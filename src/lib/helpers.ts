const getCoordinatesFromUrl = async (url: string) => {
  let response: Response | undefined;
  try {
    response = await fetch(url, {
      method: "GET",
    });
  } catch (err) {
    response = undefined;
  }

  if (!response) return undefined;

  const actualUrl = response.url;
  const coordinates = actualUrl.match(/@([0-9.-]+),([0-9.-]+)/);

  if (!coordinates) return undefined;
  if (coordinates.length < 3) return undefined;
  if (
    Number.isNaN(Number(coordinates[1])) ||
    Number.isNaN(Number(coordinates[2]))
  )
    return undefined;

  return {
    lat: Number(coordinates[1]),
    lng: Number(coordinates[2]),
  };
};

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

const getUserInfoFromPinata = async (fid: string) => {
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

export { getCoordinatesFromUrl, getUserInfoFromPinata };
