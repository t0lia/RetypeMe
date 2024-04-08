import { useSIWE } from "connectkit";
import { useAccount } from "wagmi";
import { RaceStatistic } from "@/app/api/ws-api-service";

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
  const { isConnected } = useAccount();

  const showDepositButton =
    isSignedIn &&
    !txSuccessful &&
    sessionStat?.users?.every((driver) => driver.walletId) &&
    sessionStat?.users?.length > 1;

  async function signInWithEthereum() {
    await signIn();
  }

  return (
    <>
      {showDepositButton ? (
        <button
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 "
          onClick={handleUserDeposit}
        >
          Deposit 0.1 Matic
        </button>
      ) : (
        <button
          className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
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
        </button>
      )}
    </>
  );
}
