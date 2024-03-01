import { RaceStatistic } from "@/app/api/ws-api-service";

interface IStartDepositButton {
  ingameWalletId: string | null;
  txSuccessful: boolean;
  sessionStat: RaceStatistic;
  isButtonDisabled: boolean;
  handleUserDeposit: () => void;
  handleStartGame: () => void;
  startBtnText: string;
}

export default function StartDepositButton({
  ingameWalletId,
  txSuccessful,
  sessionStat,
  handleUserDeposit,
  isButtonDisabled,
  handleStartGame,
  startBtnText,
}: IStartDepositButton) {
  const showDepositButton =
    ingameWalletId !== null &&
    ingameWalletId !== "" &&
    !txSuccessful &&
    sessionStat?.users?.every((driver) => driver.walletId) &&
    sessionStat?.users?.length > 1;

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
          onClick={() => handleStartGame()}
          disabled={isButtonDisabled}
        >
          {startBtnText}
        </button>
      )}
    </>
  );
}
