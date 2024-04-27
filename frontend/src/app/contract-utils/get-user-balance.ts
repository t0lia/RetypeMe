import { type BaseError, useReadContract, useAccount } from "wagmi";
import { formatEther } from "viem";
import { abi, contractAddress } from "../contracts/game-contract";

export default function getUserBalance() {
  const { address } = useAccount();
  const {
    data: balance,
    error,
    isPending,
  } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "getBalance",
    args: [address],
  });

  if (isPending) {
    return "Loading...";
  }

  if (error)
    return `Error: ${(error as BaseError).shortMessage || error.message}`;

  const humanReadableBalance = formatEther(balance as bigint);

  return `${humanReadableBalance} ETH`;
}
