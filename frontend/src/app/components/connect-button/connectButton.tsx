import React, { useEffect } from "react";
import { ConnectKitButton, useChains, useModal, useSIWE } from "connectkit";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { Button } from "@/app/components/ui/button";

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
                <Button
                  className="-mr-2"
                  onClick={openSwitchNetworks}
                  // className="bg-gray-600 rounded py-2 px-4 -mr-2 text-gray-100 font-bold"
                >
                  {supportedChains.find((c) => c.id === chainId)?.name ||
                    "Unsupported Chain"}
                </Button>
                {isLoading && (
                  <div className="bg-slate-900 text-slate-50  dark:bg-slate-50 dark:text-slate-900 py-2 px-4 -mr-2">
                    Fetching balance…
                  </div>
                )}
                {isError && (
                  <div className="bg-slate-900 text-slate-50  dark:bg-slate-50 dark:text-slate-900 py-2 px-4 -mr-2">
                    Error fetching balance
                  </div>
                )}
                {data && (
                  // <div className="bg-gray-600 rounded py-2 px-4 -mr-2 text-gray-100 font-bold">
                  <div className="bg-slate-900 text-slate-50  dark:bg-slate-50 dark:text-slate-900 py-2 px-4 -mr-2">
                    {formatUnits(data!.value, data!.decimals).slice(0, 5)}{" "}
                    {data?.symbol}
                  </div>
                )}
              </>
            )}
            <Button
              onClick={isButtonDisabled || isGameEnded ? () => {} : show}
              // className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
              className={` ${
                isButtonDisabled || isGameEnded
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </Button>
          </>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

export default React.memo(ConnectButton);
