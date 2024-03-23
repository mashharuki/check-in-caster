import { ethers } from "ethers";
import { tokenAddress, tokenABI } from '../config/index'

export const creditTokens = ({ address }: { address: string }) => {
  if (address) {
    const CHECK_IN_TOKEN = 10;
  }
};

export const MintNFT = ({ address }: { address: string }) => { };



export const airdropTokens = async ({ address, amount }: { address: string, amount: Number }) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider("https://sepolia.base.org")
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)
    const contract = new ethers.Contract(tokenAddress, tokenABI, wallet)
    const airdrop = await contract.mint(address, amount)
    console.log(airdrop)
  } catch (error) {
    console.log(error)
  }
}