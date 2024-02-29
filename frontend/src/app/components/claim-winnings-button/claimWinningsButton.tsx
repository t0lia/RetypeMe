import { useState } from "react";

import { withdrawWinnings } from "@/app/contract-utils/claim-winnings";
import { DriverMetrics } from "@/app/api/ws-api-service";

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

  async function handleClaimWinnings() {
    const response = await withdrawWinnings();
    console.log(response);
    if (response && response.status === 1) {
      setSuccessfulWithdrawlWinnings(true);
    }
  }

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
                Claim winnings 🏆
              </button>
            );
          }
        })}
    </>
  );
}
