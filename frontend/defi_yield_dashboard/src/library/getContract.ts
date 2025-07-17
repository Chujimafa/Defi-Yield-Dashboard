import { getContract } from "thirdweb";
import { createThirdwebClient } from "thirdweb";
import { sepolia } from "thirdweb/chains";

const CONTRACT_ADDRESS = "0x229D8fACf435a54bf1433A07e2a4e2d92F0bB1E5";
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});


const dashboardContract = getContract({
  client,
  chain: sepolia, 
  address: CONTRACT_ADDRESS,
  abi: [
    {
      "inputs": [],
      "name": "ProtocolNotExists",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_apy",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_tvl",
          "type": "uint256"
        }
      ],
      "name": "addProtocol",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getProtocolsLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "lengthOfProtocols",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "protocolExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "protocolToIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "index",
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
      "name": "protocols",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "apy",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tvl",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "showAllProtocols",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "apy",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tvl",
              "type": "uint256"
            }
          ],
          "internalType": "struct DeFiProtocolManager.defiProtocol[]",
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
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_apy",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_tvl",
          "type": "uint256"
        }
      ],
      "name": "updateProtocol",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  
});

export { dashboardContract };

