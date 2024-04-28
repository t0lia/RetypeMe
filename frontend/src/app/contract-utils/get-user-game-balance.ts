// import { type BaseError, useReadContract, useAccount } from "wagmi";
// import { formatEther } from "viem";
// import { abi, contractAddress } from "../contracts/game-contract";

// export default function getUserGameBalance() {
//   const { address } = useAccount();
//   const {
//     data: balance,
//     error,
//     isPending,
//     refetch,
//   } = useReadContract({
//     abi: abi,
//     address: contractAddress,
//     functionName: "getBalance",
//     args: [address],
//   });

//   if (isPending) {
//     return "Loading...";
//   }

//   if (error)
//     return `Error: ${(error as BaseError).shortMessage || error.message}`;

//   const humanReadableBalance = formatEther(balance as bigint);

//   return `${humanReadableBalance} ETH`;
// }
import { type BaseError, useReadContract, useAccount } from "wagmi";
import { formatEther } from "viem";
import { abi, contractAddress } from "../contracts/game-contract";

export default function getUserGameBalance() {
  const { address } = useAccount();
  const {
    data: balance,
    error,
    isPending,
    refetch,
  } = useReadContract({
    abi: abi,
    address: contractAddress,
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

  return { balance: `${humanReadableBalance} ETH`, refetch };
}
