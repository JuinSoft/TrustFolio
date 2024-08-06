import { ethers } from "ethers";

export const contractAddress = "";
export const contractABI = [];

export function useDeployedContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
}