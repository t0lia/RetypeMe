import React, { useEffect } from "react";

import { useModal, useSIWE } from "connectkit";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Address, keccak256, parseEther, toBytes } from "viem";

import { RaceStatistic } from "@/app/api/ws-api-service";
import {
  CHAIN_ID_AMOY_DECIMAL,
  CHAIN_ID_BLAST_SEPOLIA_DECIMAL,
  CHAIN_ID_SCROLL_SEPOLIA_DECIMAL,
} from "@/app/constants/contract-constants";
import isEnoughBalance from "@/app/contract-utils/is-enough-balance";
import RestApiService from "@/app/api/rest-api-service";
import getUserGameBalance from "@/app/contract-utils/get-user-game-balance";

import { Button } from "@/app/components/ui/button";
import { useConfigStore } from "@/app/store/configStore";
import Spinner from "@/app/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { writeContracts } from "@wagmi/core/experimental";
import { wagmiConfig } from "@/app/helpers/web3-provider";

interface IStartDepositButton {
  txSuccessful: boolean;
  sessionStat: RaceStatistic;
  isButtonDisabled: boolean;
  handleStartGame: () => void;
  startBtnText: string;
  isConfirmingJoin: boolean;
}

function StartDepositButton({
  txSuccessful,
  sessionStat,
  isButtonDisabled,
  handleStartGame,
  startBtnText,
  isConfirmingJoin,
}: IStartDepositButton) {
  const { contractConfig } = useConfigStore();
  const { isSignedIn, signIn } = useSIWE();
  const { isConnected, chainId, address, chain, connector } = useAccount();
  const isEnough = isEnoughBalance();
  const { openSwitchNetworks } = useModal();
  const { writeContract, data: hash } = useWriteContract();
  const contractAddress =
    contractConfig.contractAddressesMap[chain?.name as string];
  const queryClient = useQueryClient();

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
    if (connector?.id === "coinbaseWalletSDK") {
      const sessionId = sessionStorage.getItem("sessionId");
      const hashSessionId = keccak256(toBytes(sessionId as string));
      writeContracts(wagmiConfig, {
        contracts: [
          {
            address: contractAddress as Address,
            abi: contractConfig.abi,
            functionName: "deposit",
            args: [],
            value: parseEther("0.001"),
          },
          {
            address: contractAddress as Address,
            abi: contractConfig.abi,
            functionName: "joinGame",
            args: [hashSessionId],
          },
        ],
      });
    } else {
      writeContract({
        address: contractAddress as Address,
        abi: contractConfig.abi,
        functionName: "deposit",
        args: [],
        value: parseEther("0.001"),
      });
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { queryKey } = getUserGameBalance();
  useEffect(() => {
    if (isConfirmed) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [isConfirmed]);

  const showDepositButton =
    isSignedIn &&
    !txSuccessful &&
    !isEnough &&
    sessionStat?.users?.every((driver) => driver.walletId) &&
    sessionStat?.users?.length > 1;

  const userStatus = sessionStat.users.find(
    (user) => user.walletId === address
  )?.state;

  return (
    <>
      {showDepositButton && !isConfirmed && userStatus !== "registered" ? (
        <Button onClick={handleUserDeposit}>
          {isConfirming && <Spinner />}
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
          {isConfirmingJoin && <Spinner />}
          {!isSignedIn && isConnected ? "Please Sign In" : `${startBtnText}`}
        </Button>
      )}
    </>
  );
}

export default React.memo(StartDepositButton);
