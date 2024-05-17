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
  console.log("READ BALANCE");
  console.log("ISPENDING", isPending, "ERROR:", error);

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
