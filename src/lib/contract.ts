import { ethers } from "ethers";
import { tokenABI, tokenAddress } from "../config/index";

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

export const MintNFT = ({ address }: { address: string }) => {};
