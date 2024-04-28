import { useEffect, useState } from "react";

import { DriverMetrics } from "@/app/api/ws-api-service";
import getUserGameBalance from "@/app/contract-utils/get-user-game-balance";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { contractAddress, abi } from "@/app/contracts/game-contract";

interface IClaimWinningsButton {
  userStats: DriverMetrics[];
  ingameWalletId: string | null;
  ingameUserId: string | null;
  txSuccessful: boolean;
}

export default function ClaimWinningsButton({
  userStats,
  ingameWalletId,
  txSuccessful,
  ingameUserId,
}: IClaimWinningsButton) {
  const [successfulWithdrawlWinnings, setSuccessfulWithdrawlWinnings] =
    useState(false);
  const { balance, refetch } = getUserGameBalance();
  const { writeContract, data: hash } = useWriteContract();

  async function handleClaimWinnings() {
    const bigIntBalance = BigInt(balance.replace(" ETH", ""));
    writeContract({
      address: contractAddress,
      abi,
      functionName: "withdraw",
      args: [bigIntBalance],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  useEffect(() => {
    if (isConfirmed) {
      setSuccessfulWithdrawlWinnings(true);
      refetch();
    }
  }, [isConfirmed]);

  return (
    <>
      {ingameWalletId &&
        userStats.every((driver) => driver.walletId) &&
        txSuccessful &&
        userStats.map((driver) => {
          if (
            driver.place === 1 &&
            driver.userId === ingameUserId &&
            !successfulWithdrawlWinnings
          ) {
            return (
              <button
                key={driver.userId}
                className="mb-5 bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 animation-pulse"
                onClick={handleClaimWinnings}
              >
                Claim winnings: ${balance} 🏆
              </button>
            );
          }
        })}
    </>
  );
}
