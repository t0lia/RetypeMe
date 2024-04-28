import React from "react";
import { useModal, useSIWE } from "connectkit";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { RaceStatistic } from "@/app/api/ws-api-service";
import {
  CHAIN_ID_AMOY_DECIMAL,
  CHAIN_ID_BLAST_SEPOLIA_DECIMAL,
  CHAIN_ID_SCROLL_SEPOLIA_DECIMAL,
} from "@/app/constants/contract-constants";
import { Button } from "@/app/components/ui/button";
import isEnoughBalance from "@/app/contract-utils/is-enough-balance";
import RestApiService from "@/app/api/rest-api-service";
import { contractAddress, abi } from "@/app/contracts/game-contract";
import { parseEther } from "viem";

interface IStartDepositButton {
  txSuccessful: boolean;
  sessionStat: RaceStatistic;
  isButtonDisabled: boolean;
  // handleUserDeposit: () => void;
  handleStartGame: () => void;
  startBtnText: string;
}

function StartDepositButton({
  txSuccessful,
  sessionStat,
  // handleUserDeposit,
  isButtonDisabled,
  handleStartGame,
  startBtnText,
}: IStartDepositButton) {
  const { isSignedIn, signIn } = useSIWE();
  const { isConnected, chainId, address } = useAccount();
  const isEnough = isEnoughBalance();
  const { openSwitchNetworks } = useModal();
  const { writeContract, data: hash } = useWriteContract();

  async function signInWithEthereum(): Promise<void> {
    await signIn();
  }

  async function handleUserDeposit() {
    const restApiService = new RestApiService();
    const sessionChainId = (await restApiService.getGameSession(sessionStat.id))
      .chain;

    if (chainId !== sessionChainId) {
      openSwitchNetworks();
      return;
    }
    writeContract({
      address: contractAddress,
      abi,
      functionName: "deposit",
      args: [],
      value: parseEther("0.001"),
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const showDepositButton =
    isSignedIn &&
    !txSuccessful &&
    !isEnough &&
    sessionStat?.users?.every((driver) => driver.walletId) &&
    sessionStat?.users?.length > 1;

  const userStatus = sessionStat.users.find(
    (user) => user.walletId === address
  )?.state;

  console.log("HASH", hash, "DONE", isConfirmed);
  console.log(
    "TEXT",
    startBtnText,
    "STAT",
    sessionStat.users.find((user) => user.walletId === address)?.state
  );
  return (
    <>
      {showDepositButton && !isConfirmed && userStatus !== "registered" ? (
        <Button onClick={handleUserDeposit}>
          {`Deposit 0.001 ${
            chainId === CHAIN_ID_SCROLL_SEPOLIA_DECIMAL ||
            chainId === CHAIN_ID_BLAST_SEPOLIA_DECIMAL
              ? "ETH"
              : chainId === CHAIN_ID_AMOY_DECIMAL
              ? "Matic"
              : ""
          }`}
        </Button>
      ) : (
        <Button
          className={`${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            if (!isSignedIn && isConnected) {
              signInWithEthereum();
            }
            if (isSignedIn) {
              handleStartGame();
            }
          }}
          disabled={isButtonDisabled}
        >
          {!isSignedIn && isConnected ? "Please Sign In" : `${startBtnText}`}
        </Button>
      )}
    </>
  );
}

export default React.memo(StartDepositButton);
