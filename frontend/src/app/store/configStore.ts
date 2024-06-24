import { create } from "zustand";

export interface ConfigState {
  contractConfig: ContractConfig; // Define a more specific type based on your configuration
  setConfig: (config: any) => void;
}

export interface ContractConfig {
  chains: ChainConfig[];
  abi: any[];
  contractAddressesMap: { [key: string]: string };
}

export interface ChainConfig {
  id: number;
  name: string;
  rpc: string;
  contract: string;
}

const scrollSepoliaContractAddress =
  "0x078869dd68d019900098b5b1006951ea7b3f01f2";
const opBnbContractAddress = "0x247e2bee76ec31c1a4caaf06600a80ffd6774dd6";
const polygonAmoyContractAddress = "0x993558c22ebe07c96e8f85d1ef4318c513abff0d";
const blastSepoliaContractAddress =
  "0xb3c33b58de859a5e06aff62c9d66319c256218da";
const baseSepoliaContractAddress = "0xb4eb30e7f583d788a1611f4b7022bdda4bd4af81";

const contractAddressesMap: { [key: string]: string } = {
  "Blast Sepolia": blastSepoliaContractAddress,
  "Scroll Sepolia": scrollSepoliaContractAddress,
  "Polygon Amoy": polygonAmoyContractAddress,
  "opBNB Testnet": opBnbContractAddress,
  "Base Sepolia": baseSepoliaContractAddress,
};

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [
      {
        indexed: true,
        name: "sessionId",
        internalType: "uint256",
        type: "uint256",
      },
      {
        indexed: false,
        name: "winner",
        internalType: "address",
        type: "address",
      },
      {
        indexed: false,
        name: "winnings",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "GameEnded",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: true,
        name: "sessionId",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "GameStarted",
    anonymous: false,
    type: "event",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [],
    name: "DUEL_PLAYERS_COUNT",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [],
    inputs: [
      { name: "_newCommissionRate", internalType: "uint256", type: "uint256" },
    ],
    name: "changeCommissionRate",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [
      {
        name: "_newFixedDepositAmount",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "changeFixedDepositAmount",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [],
    name: "commissionRate",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [],
    inputs: [],
    name: "deposit",
    stateMutability: "payable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [
      { name: "_sessionId", internalType: "uint256", type: "uint256" },
      { name: "_winner", internalType: "address", type: "address" },
    ],
    name: "endGame",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [],
    name: "fixedDepositAmount",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [
      { name: "depositAmount", internalType: "uint256", type: "uint256" },
      { name: "sessionId", internalType: "uint256", type: "uint256" },
      {
        name: "status",
        internalType: "enum GamingContract.GameStatus",
        type: "uint8",
      },
      { name: "winner", internalType: "address", type: "address" },
    ],
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "gameSessions",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "_user", internalType: "address", type: "address" }],
    name: "getBalance",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "_user", internalType: "address", type: "address" }],
    name: "getMinDeposit",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "inGameUserBalances",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    inputs: [{ name: "_user", internalType: "address", type: "address" }],
    name: "isEnoughBalance",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [],
    inputs: [{ name: "_sessionId", internalType: "uint256", type: "uint256" }],
    name: "joinGame",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "address", type: "address" }],
    inputs: [],
    name: "owner",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [],
    name: "totalCommission",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [],
    inputs: [{ name: "_amount", internalType: "uint256", type: "uint256" }],
    name: "withdraw",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [],
    name: "withdrawCommissionFromContract",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [],
    name: "withdrawFundsFromContract",
    stateMutability: "nonpayable",
    type: "function",
  },
];

const chains: ChainConfig[] = [
  // {
  //   "id": 534351,
  //   "name": "scroll-sepolia",
  //   "rpc": `https://scroll-sepolia.core.chainstack.com/c02e3ccda5dd045b98b943c1ab129544`,
  //   "contract": "0x078869dd68d019900098b5b1006951ea7b3f01f2"
  // },
  {
    id: 5611,
    name: "opbnb-testnet",
    rpc: "https://opbnb-testnet-rpc.publicnode.com",
    contract: "0x247e2bee76ec31c1a4caaf06600a80ffd6774dd6",
  },
  {
    id: 84532,
    name: "base-sepolia",
    rpc: "https://sepolia.base.org",
    contract: "0xb4eb30e7f583d788a1611f4b7022bdda4bd4af81",
  },
  {
    id: 168587773,
    name: "blast-sepolia",
    rpc: `https://blast-sepolia.infura.io/v3/91f259e2739445678d072c85496b47b7`,
    contract: "0xb3c33b58de859a5e06aff62c9d66319c256218da",
  },
  // {
  //   "id": 80002,
  //   "name": "polygon-amoy",
  //   "rpc": `https://polygon-amoy.infura.io/v391f259e2739445678d072c85496b47b7`,
  //   "contract": "0x993558c22ebe07c96e8f85d1ef4318c513abff0d"
  // }
];

export const useConfigStore = create<ConfigState>((set) => ({
  contractConfig: { chains, abi, contractAddressesMap },
  setConfig: (contractConfig) => set({ contractConfig }),
}));
