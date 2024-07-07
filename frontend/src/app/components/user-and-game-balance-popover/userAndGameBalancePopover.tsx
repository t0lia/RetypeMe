import React, { useEffect, useRef } from "react";
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Address, formatUnits, parseEther } from "viem";
import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import getUserGameBalance from "../../contract-utils/get-user-game-balance";
import { useConfigStore } from "@/app/store/configStore";
import Spinner from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function UserAndGameBalancePopover() {
  const { contractConfig } = useConfigStore();
  const { address, chainId } = useAccount();
  const {
    data,
    isError,
    isLoading,
    queryKey: userBalanceQueryKey,
  } = useBalance({
    address: address,
    chainId: chainId,
  });
  const queryClient = useQueryClient();

  const contractAddress = contractConfig.chains.find(
    (chain) => chain.name === chain?.name
  )?.contract;

  const {
    writeContract,
    data: hash,
    isPending: isPendingTx,
  } = useWriteContract();

  const withdrawInputRef = useRef<HTMLInputElement>(null);
  const depositInputRef = useRef<HTMLInputElement>(null);

  const {
    isPending,
    error,
    humanReadableBalance: userGameBalanceValue,
    queryKey,
  } = getUserGameBalance();

  let shortUserBalanceValue;
  let userBalanceValue;

  if (data) {
    userBalanceValue = formatUnits(data!.value, data!.decimals);
    shortUserBalanceValue = `${userBalanceValue.slice(0, 6)}`;
  }

  const userBalances = (
    <div className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground text-sm font-medium py-2 px-4 -mr-2 h-10">
      {isLoading && <Spinner />}
      {isError && "Error"}
      {data && `${shortUserBalanceValue}`} | {isPending && <Spinner />}
      {error && error}
      {userGameBalanceValue && userGameBalanceValue.slice(0, 6)}
    </div>
  );

  async function handleUserWithdraw(inputValue: string) {
    const value = parseFloat(inputValue);
    if (value > 0) {
      writeContract({
        address: contractAddress as Address,
        abi: contractConfig.abi,
        functionName: "withdraw",
        args: [parseEther(inputValue)],
      });
    }
  }

  async function handleUserDeposit(depositInputValue: string) {
    const value = parseFloat(depositInputValue);
    if (value > 0) {
      writeContract({
        address: contractAddress as Address,
        abi: contractConfig.abi,
        functionName: "deposit",
        args: [],
        value: parseEther(depositInputValue),
      });
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
    queryClient.invalidateQueries({ queryKey: userBalanceQueryKey });
  }, [isConfirmed]);

  return (
    <Popover>
      <PopoverTrigger>{userBalances}</PopoverTrigger>
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
                max={userBalanceValue}
                ref={depositInputRef}
              />
              <Button
                onClick={() => {
                  if (depositInputRef.current) {
                    depositInputRef.current.value = formatUnits(
                      data!.value,
                      data!.decimals
                    );
                  }
                }}
              >
                Max
              </Button>
            </div>
            <Button
              className="mt-2 self-stretch"
              onClick={() => {
                handleUserDeposit(depositInputRef.current?.value as string);
              }}
            >
              {(isConfirming || isPendingTx) && <Spinner />}
              Deposit
            </Button>
          </TabsContent>
          <TabsContent value="withdraw" className="flex flex-col">
            <div className="flex w-full items-center gap-2 mt-2">
              <Input
                type="number"
                placeholder="0"
                step={0.0001}
                min={0}
                max={userGameBalanceValue}
                ref={withdrawInputRef}
              />
              <Button
                onClick={() => {
                  if (withdrawInputRef.current) {
                    withdrawInputRef.current.value =
                      userGameBalanceValue as string;
                  }
                }}
              >
                Max
              </Button>
            </div>
            <Button
              onClick={() => {
                handleUserWithdraw(withdrawInputRef.current?.value as string);
              }}
              className="mt-2 self-stretch"
            >
              {(isConfirming || isPendingTx) && <Spinner />}
              Withdraw
            </Button>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
