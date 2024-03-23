import { ethers } from "ethers";
import { tokenABI, tokenAddress, nftABI, nftAddress } from "../config/index";

export const creditTokens = async ({ address }: { address: string }) => {
  if (address) {
    const CHECK_IN_TOKEN = 10;

    console.log("address");
    console.log(address);

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://sepolia.base.org",
      );
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
      const contract = new ethers.Contract(tokenAddress, tokenABI, wallet);
      const airdrop = await contract.mint(address, CHECK_IN_TOKEN);
      console.log(airdrop);
    } catch (error) {
      console.log(error);
    }
  }
};

export const MintNFT = async ({ address }: { address: string }) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://sepolia.base.org",
    );
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    const contract = new ethers.Contract(nftAddress, nftABI, wallet);
    const mint = await contract.mint(address);
    const receipt =  await mint.wait();
    console.log(receipt)
    const tokenId = receipt.events[0].args[2];
    return tokenId.toString()
  } catch (error) {
    console.log(error);
  }
};
