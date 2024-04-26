import { BrowserProvider, Contract } from "ethers";

let provider;
export const contractAddress = "0xf813B4E5D34079EBCc59adf39A7782AD989891Fe";
// export const contractAddress = "0xb3Aa754f1664719489fb10e0c5F9B98D8AC232b9";

if (typeof window !== "undefined") {
  provider = new BrowserProvider(window.ethereum);
}

export const abi = [
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
    inputs: [],
    name: "getBalance",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [],
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
    inputs: [],
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
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
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

export { provider };
export const gameContract = new Contract(contractAddress, abi, provider);
