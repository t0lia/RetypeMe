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

  // let userBalanceValue;
  // if (data) {
  //   userBalanceValue = `${formatUnits(data!.value, data!.decimals).slice(
  //     0,
  //     5
  //   )} ${data?.symbol}`;
  // }

  // const userBalance = (
  //   <div className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground text-sm font-medium py-2 px-4 -mr-2 h-10">
  //     {isLoading && "Fetching balance…"}
  //     {isError && "Error fetching balance"}
  //     {data && userBalanceValue}
  //   </div>
  // );

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
                {/* <Popover>
                  <PopoverTrigger>{userBalance}</PopoverTrigger>
                  <PopoverContent>
                    <Tabs defaultValue="deposit" className="flex flex-col">
                      <TabsList className="m-auto">
                        <TabsTrigger value="deposit">Deposit</TabsTrigger>
                        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                      </TabsList>
                      <TabsContent value="deposit" className="flex flex-col">
                        <div className="flex w-full items-center gap-2 mt-2">
                          <Input
                            type="number"
                            placeholder="0"
                            step={0.0001}
                            min={0}
                          />
                          <Button>Max</Button>
                        </div>
                        <Button className="mt-2 self-stretch">Deposit</Button>
                      </TabsContent>
                      <TabsContent value="withdraw" className="flex flex-col">
                        <div className="flex w-full items-center gap-2   mt-2">
                          <Input
                            type="number"
                            placeholder="0"
                            step={0.0001}
                            min={0}
                          />
                          <Button>Max</Button>
                        </div>
                        <Button className="mt-2 self-stretch">Withdraw</Button>
                      </TabsContent>
                    </Tabs>
                  </PopoverContent>
                </Popover> */}
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
