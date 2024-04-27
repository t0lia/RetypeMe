import { type BaseError, useReadContract, useAccount } from "wagmi";
import { abi, contractAddress } from "../contracts/game-contract";

export default function isEnoughBalance() {
  const { address } = useAccount();
  const {
    data: isEnough,
    error,
    isPending,
  } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "isEnoughBalance",
    args: [address],
  });

  if (isPending) {
    return "Loading...";
  }

  if (error)
    return `Error: ${(error as BaseError).shortMessage || error.message}`;
  return isEnough;
}
