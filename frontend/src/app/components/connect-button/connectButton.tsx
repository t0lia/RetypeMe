import React, { useEffect } from "react";
import { ConnectKitButton, useChains, useModal } from "connectkit";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";

interface ConnectButtonProps {
  isButtonDisabled?: boolean;
  isGameEnded?: boolean;
}

function ConnectButton({ isButtonDisabled, isGameEnded }: ConnectButtonProps) {
  const supportedChains = useChains();
  const userChain = useAccount();
  const userAddress = useAccount();
  const { openSwitchNetworks, setOpen } = useModal();

  const { data, isError, isLoading } = useBalance({
    address: userAddress.address,
    chainId: userChain.chainId,
  });

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
              <>
                <button
                  onClick={openSwitchNetworks}
                  className="bg-gray-600 rounded py-2 px-4 -mr-2 text-gray-100 font-bold"
                >
                  {supportedChains.find((c) => c.id === userChain.chainId)
                    ?.name || "Unsupported Chain"}
                </button>
                {isLoading && (
                  <div className="bg-gray-600 rounded py-2 px-4 -mr-2 text-gray-100 font-bold">
                    Fetching balance…
                  </div>
                )}
                {isError && (
                  <div className="bg-gray-600 rounded py-2 px-4 -mr-2 text-gray-100 font-bold">
                    Error fetching balance
                  </div>
                )}
                {data && (
                  <div className="bg-gray-600 rounded py-2 px-4 -mr-2 text-gray-100 font-bold">
                    {formatUnits(data!.value, data!.decimals).slice(0, 5)}{" "}
                    {data?.symbol}
                  </div>
                )}
              </>
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
