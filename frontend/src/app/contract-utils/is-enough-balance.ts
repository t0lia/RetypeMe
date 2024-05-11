import { useReadContract, useAccount } from "wagmi";
import { abi, contractAddressesMap } from "../contracts/game-contract";
import { Address, BaseError } from "viem";

export default function isEnoughBalance() {
  const { address, chain } = useAccount();
  const contractAddress = contractAddressesMap[chain?.name as string];
  const {
    data: isEnough,
    error,
    isPending,
  } = useReadContract({
    abi: abi,
    address: contractAddress as Address,
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
