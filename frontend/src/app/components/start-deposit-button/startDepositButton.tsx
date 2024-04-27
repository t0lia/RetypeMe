import { useSIWE } from "connectkit";
import { useAccount } from "wagmi";
import { RaceStatistic } from "@/app/api/ws-api-service";
import {
  CHAIN_ID_AMOY_DECIMAL,
  CHAIN_ID_BLAST_SEPOLIA_DECIMAL,
  CHAIN_ID_SCROLL_SEPOLIA_DECIMAL,
} from "@/app/constants/contract-constants";
import { Button } from "@/app/components/ui/button";
import isEnoughBalance from "@/app/contract-utils/is-enough-balance";

interface IStartDepositButton {
  txSuccessful: boolean;
  sessionStat: RaceStatistic;
  isButtonDisabled: boolean;
  handleUserDeposit: () => void;
  handleStartGame: () => void;
  startBtnText: string;
}

export default function StartDepositButton({
  txSuccessful,
  sessionStat,
  handleUserDeposit,
  isButtonDisabled,
  handleStartGame,
  startBtnText,
}: IStartDepositButton) {
  const { isSignedIn, signIn } = useSIWE();
  const { isConnected, chainId } = useAccount();
  const isEnough = isEnoughBalance();

  const showDepositButton =
    isSignedIn &&
    // !txSuccessful &&
    !isEnough &&
    sessionStat?.users?.every((driver) => driver.walletId) &&
    sessionStat?.users?.length > 1;

  async function signInWithEthereum(): Promise<void> {
    await signIn();
  }

  return (
    <>
      {showDepositButton ? (
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
            if (!isSignedIn && !isConnected) {
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
