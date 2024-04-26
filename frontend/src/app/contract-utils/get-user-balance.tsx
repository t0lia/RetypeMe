import { type BaseError, useReadContract, useAccount } from "wagmi";
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
    return <div>Loading...</div>;
  }

  if (error)
    return (
      <div>Error: {(error as BaseError).shortMessage || error.message}</div>
    );
  console.log(balance, balance?.toString());
  return <div>Balance: {balance?.toString()}</div>;
}
