import React from "react";
import { ConnectKitButton } from "connectkit";

interface ConnectButtonProps {
  isButtonDisabled?: boolean;
  isGameEnded?: boolean;
}

function ConnectButton({ isButtonDisabled, isGameEnded }: ConnectButtonProps) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <button
            onClick={isButtonDisabled || isGameEnded ? () => {} : show}
            className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
              isButtonDisabled || isGameEnded
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

export default React.memo(ConnectButton);
