import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./contract";

const BASE_SEPOLIA_CHAIN_ID = 84532;

export const useContract = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();

        if (network.chainId !== BASE_SEPOLIA_CHAIN_ID) {
          await switchToBaseSepolia();
        }

        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const switchToBaseSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(BASE_SEPOLIA_CHAIN_ID) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ethers.utils.hexValue(BASE_SEPOLIA_CHAIN_ID),
                chainName: 'Base Sepolia',
                rpcUrls: ['https://sepolia.base.org'],
                nativeCurrency: {
                  name: 'Base',
                  symbol: 'ETH',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://base-sepolia.blockscout.com'],
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding Base Sepolia", addError);
        }
      } else {
        console.error("Error switching to Base Sepolia", switchError);
      }
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return { contract, account, connectWallet };
};