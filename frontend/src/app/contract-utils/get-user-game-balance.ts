import { useReadContract, useAccount } from "wagmi";
import { formatEther, Address, BaseError } from "viem";
import { useConfigStore } from "@/app/store/configStore";

export default function getUserGameBalance() {
  const { address, chain } = useAccount();
  const { contractConfig } = useConfigStore();
  const contractAddress =
    contractConfig.contractAddressesMap[chain?.name as string];

  const {
    data: balance,
    error,
    isPending,
    refetch,
  } = useReadContract({
    abi: contractConfig.abi,
    address: contractAddress as Address,
    functionName: "getBalance",
    args: [address],
  });

  if (isPending) {
    return { isPending: "Loading...", refetch };
  }

  if (error) {
    return {
      error: `Error: ${(error as BaseError).shortMessage || error.message}`,
      refetch,
    };
  }

  const humanReadableBalance = formatEther(balance as bigint);
  return { humanReadableBalance, refetch };
}
