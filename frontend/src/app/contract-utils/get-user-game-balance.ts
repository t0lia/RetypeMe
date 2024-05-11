import { useReadContract, useAccount } from "wagmi";
import { formatEther, Address, BaseError } from "viem";
import { abi, contractAddressesMap } from "../contracts/game-contract";

export default function getUserGameBalance() {
  const { address, chain } = useAccount();
  const contractAddress = contractAddressesMap[chain?.name as string];

  const {
    data: balance,
    error,
    isPending,
    refetch,
  } = useReadContract({
    abi: abi,
    address: contractAddress as Address,
    functionName: "getBalance",
    args: [address],
  });

  if (isPending) {
    return { balance: "Loading...", refetch };
  }

  if (error)
    return {
      balance: `Error: ${(error as BaseError).shortMessage || error.message}`,
      refetch,
    };

  const humanReadableBalance = formatEther(balance as bigint);

  return { balance, humanReadableBalance, refetch };
}
