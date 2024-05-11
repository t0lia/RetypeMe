import React, { useEffect } from "react";
import { ConnectKitButton, useChains, useModal, useSIWE } from "connectkit";
import { useAccount, useBalance } from "wagmi";
import { Button } from "@/app/components/ui/button";
import UserAndGameBalancePopover from "../user-and-game-balance-popover";

interface ConnectButtonProps {
  isButtonDisabled?: boolean;
  isGameEnded?: boolean;
}

function ConnectButton({ isButtonDisabled, isGameEnded }: ConnectButtonProps) {
  const supportedChains = useChains();
  const { address, chainId, isConnected } = useAccount();
  const { openSwitchNetworks, setOpen } = useModal();
  const { data } = useBalance({
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
                <Button className="-mr-2" onClick={openSwitchNetworks}>
                  {supportedChains.find((c) => c.id === chainId)?.name ||
                    "Unsupported Chain"}
                </Button>
                <UserAndGameBalancePopover />
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
