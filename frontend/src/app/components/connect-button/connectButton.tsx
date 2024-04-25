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

  let userBalanceValue;
  if (data) {
    userBalanceValue = `${formatUnits(data!.value, data!.decimals).slice(
      0,
      5
    )} ${data?.symbol}`;
  }

  const userBalance = (
    <div className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground text-sm font-medium py-2 px-4 -mr-2 h-10">
      {isLoading && "Fetching balance…"}
      {isError && "Error fetching balance"}
      {data && userBalanceValue}
    </div>
  );

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <>
            {chainId && (
              <>
                <Button className="-mr-2" onClick={openSwitchNetworks}>
                  {supportedChains.find((c) => c.id === chainId)?.name ||
                    "Unsupported Chain"}
                </Button>
                {userBalance}
              </>
            )}
            <Button
              onClick={isButtonDisabled || isGameEnded ? () => {} : show}
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
