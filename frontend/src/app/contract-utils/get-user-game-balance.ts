import { useReadContract, useAccount } from "wagmi";
import { formatEther, Address, BaseError } from "viem";
import { useConfigStore } from "@/app/store/configStore";

export default function getUserGameBalance() {
  const { address, chain } = useAccount();
  const { contractConfig } = useConfigStore();
  const contractAddress = contractConfig.chains.find((chain) => chain.name === chain?.name)?.contract;

  const {
    data: balance,
    error,
    isPending,
    queryKey,
  } = useReadContract({
    abi: contractConfig.abi,
    address: contractAddress as Address,
    functionName: "getBalance",
    args: [address],
  });

  if (isPending) {
    return { isPending: "Loading...", queryKey };
  }

  if (error) {
    return {
      error: `Error: ${(error as BaseError).shortMessage || error.message}`,
      queryKey,
    };
  }

  const humanReadableBalance = formatEther(balance as bigint);
  return { humanReadableBalance, queryKey };
}
