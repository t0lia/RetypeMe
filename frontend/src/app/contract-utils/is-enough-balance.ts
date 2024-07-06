import { useReadContract, useAccount } from "wagmi";
import { Address, BaseError } from "viem";
import {useConfigStore} from "@/app/store/configStore";

export default function isEnoughBalance() {
  const {contractConfig} = useConfigStore();
  const { address, chain } = useAccount();
  const contractAddress = contractConfig.chains.find((chain) => chain.name === chain?.name)?.contract;
  const {
    data: isEnough,
    error,
    isPending,
  } = useReadContract({
    abi: contractConfig.abi,
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
