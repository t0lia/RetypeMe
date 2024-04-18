import React, { useEffect } from "react";
import { ConnectKitButton, useChains, useModal, useSIWE } from "connectkit";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";

interface ConnectButtonProps {
  isButtonDisabled?: boolean;
  isGameEnded?: boolean;
}

function ConnectButton({ isButtonDisabled, isGameEnded }: ConnectButtonProps) {
  const supportedChains = useChains();
  const { address, chainId, isConnected } = useAccount();
  const { openSwitchNetworks, setOpen } = useModal();
  const { data, isError, isLoading } = useBalance({
    address: address,
    chainId: chainId,
  });
  const { signIn, isSignedIn } = useSIWE();

  async function signInAfterConnect() {
    try {
      setOpen(false);
      if (data) await signIn();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!isSignedIn && isConnected && chainId) signInAfterConnect();
  }, [chainId, isConnected]);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <>
            {chainId && (
              <>
                <button
                  onClick={openSwitchNetworks}
                  className="bg-gray-600 rounded py-2 px-4 -mr-2 text-gray-100 font-bold"
                >
                  {supportedChains.find((c) => c.id === chainId)?.name ||
                    "Unsupported Chain"}
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
