import React, { useEffect } from "react";
import { ConnectKitButton, useChains, useModal } from "connectkit";
import { useAccount } from "wagmi";

interface ConnectButtonProps {
  isButtonDisabled?: boolean;
  isGameEnded?: boolean;
}

function ConnectButton({ isButtonDisabled, isGameEnded }: ConnectButtonProps) {
  const supportedChains = useChains();
  const userChain = useAccount();
  const { openSwitchNetworks, setOpen } = useModal();

  useEffect(() => {
    if (userChain.chainId) {
      setOpen(false);
    }
  }, [userChain.chainId]);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <>
            {userChain.chainId && (
              <div
                onClick={openSwitchNetworks}
                className="bg-gray-600 rounded py-2 px-4 -mr-2 text-gray-100 font-bold"
              >
                {supportedChains.find((c) => c.id === userChain.chainId)
                  ?.name || "Unsupported Chain"}
              </div>
            )}
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
          </>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

export default React.memo(ConnectButton);
