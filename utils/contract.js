import { ethers } from "ethers";

export const contractAddress = "0xBb95A888B4EBF96f8A7279Ea7A49A69cd4b12Ac9";
export const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bidId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requirementId",
				"type": "uint256"
			}
		],
		"name": "BidAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requirementId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			}
		],
		"name": "BidPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "poster",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenOffered",
				"type": "uint256"
			}
		],
		"name": "RequirementPosted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bidId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requirementId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokensTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_bidId",
				"type": "uint256"
			}
		],
		"name": "acceptBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bidCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "requirementId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "bidder",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sampleDataUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fullDataUrl",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isAccepted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllRequirements",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "poster",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "videoUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "thumbnailUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dataType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "additionalData",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "tokenOffered",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isFullfilled",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isTransferred",
						"type": "bool"
					}
				],
				"internalType": "struct TrustFolio.Requirement[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_requirementId",
				"type": "uint256"
			}
		],
		"name": "getBidsForRequirement",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "requirementId",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "bidder",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sampleDataUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fullDataUrl",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isAccepted",
						"type": "bool"
					}
				],
				"internalType": "struct TrustFolio.Bid[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_requirementId",
				"type": "uint256"
			}
		],
		"name": "getRequirementBids",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserBids",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "requirementId",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "bidder",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sampleDataUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fullDataUrl",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isAccepted",
						"type": "bool"
					}
				],
				"internalType": "struct TrustFolio.Bid[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserRequirements",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "poster",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "videoUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "thumbnailUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dataType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "additionalData",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "tokenOffered",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isFullfilled",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isTransferred",
						"type": "bool"
					}
				],
				"internalType": "struct TrustFolio.Requirement[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_requirementId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_sampleDataUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fullDataUrl",
				"type": "string"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_videoUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_thumbnailUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dataType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_additionalData",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_tokenOffered",
				"type": "uint256"
			}
		],
		"name": "postRequirement",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "requirementBids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requirementCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "requirements",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "poster",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "videoUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "thumbnailUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dataType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "additionalData",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "tokenOffered",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isFullfilled",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isTransferred",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export function useDeployedContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
}