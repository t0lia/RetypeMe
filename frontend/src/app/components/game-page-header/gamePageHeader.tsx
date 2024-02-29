import React from "react";
import { formatWallet } from "@/app/helpers";

interface IGamePageHeaderProps {
  ingameWalletId: string | null;
  isButtonDisabled: boolean;
  isGameEnded: boolean;
  onClickConnectButton: () => void;
}

function GamePageHeader({
  ingameWalletId,
  isButtonDisabled,
  isGameEnded,
  onClickConnectButton,
}: IGamePageHeaderProps) {
  return (
    <header className="flex h-16 justify-end items-center p-4">
      {ingameWalletId !== null && ingameWalletId !== "" ? (
        <button
          disabled={isButtonDisabled}
          className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {formatWallet(ingameWalletId)}
        </button>
      ) : (
        <button
          disabled={isButtonDisabled || isGameEnded}
          onClick={onClickConnectButton}
          className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
            isButtonDisabled || isGameEnded
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Connect wallet
        </button>
      )}
    </header>
  );
}

export default React.memo(GamePageHeader);
