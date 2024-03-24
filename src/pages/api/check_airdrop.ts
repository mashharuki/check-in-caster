import { MintNFT, creditTokens } from "@/lib/contract";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(
  request: NextApiRequest,
  res: NextApiResponse,
) {
  const secretKey = request.headers["key"];
  if (secretKey !== process.env.MINT_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { wallet_address } = request.body;

  try {
    await creditTokens({
      address: wallet_address,
    });

    const tokenId = await MintNFT({
      address: wallet_address,
    });

    return res.status(200).json({ token_id: tokenId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
  return res.status(500).json({ message: "failed" });
}
