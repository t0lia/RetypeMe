import { useEffect, useState } from "react";

import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useWatchContractEvent,
  useAccount,
} from "wagmi";
import { DriverMetrics } from "@/app/api/ws-api-service";
import getUserGameBalance from "@/app/contract-utils/get-user-game-balance";

import { Button } from "../ui/button";
import { Address } from "viem";
import {useConfigStore} from "@/app/store/configStore";

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

  const {contractConfig} = useConfigStore();

  const [successfulWithdrawlWinnings, setSuccessfulWithdrawlWinnings] =
    useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const { balance, humanReadableBalance, refetch } = getUserGameBalance();
  const { writeContract, data: hash } = useWriteContract();

  const { chain } = useAccount();
  const contractAddress = contractConfig.chains.find((chain) => chain.name === chain?.name)?.contract;

  const winner = userStats.find((driver) => driver.place === 1);

  useWatchContractEvent({
    address: contractAddress as Address,
    abi: contractConfig.abi,
    eventName: "GameEnded",
    onLogs(logs) {
      if (winner && winner.userId === ingameUserId) {
        console.log("New logs!", logs);
        refetch();
        setGameEnded(true);
      }
    },
  });

  async function handleClaimWinnings() {
    writeContract({
      address: contractAddress as Address,
      abi: contractConfig.abi,
      functionName: "withdraw",
      args: [balance],
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
        gameEnded &&
        userStats.every((driver) => driver.walletId) &&
        txSuccessful &&
        userStats.map((driver) => {
          if (
            driver.place === 1 &&
            driver.userId === ingameUserId &&
            !successfulWithdrawlWinnings
          ) {
            return (
              <Button
                key={driver.userId}
                className="transform active:translate-y-0.5 animation-pulse"
                onClick={handleClaimWinnings}
              >
                Claim winnings: ${humanReadableBalance} 🏆
              </Button>
            );
          }
        })}
    </>
  );
}
