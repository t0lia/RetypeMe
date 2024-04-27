import React from "react";
import ConnectButton from "../connect-button/connectButton";
import ModeToggle from "@/app/components/ui/toggle-theme-changer";
import getUserBalance from "@/app/contract-utils/get-user-balance";
import { useAccount } from "wagmi";

interface IGamePageHeaderProps {
  isButtonDisabled: boolean;
  isGameEnded: boolean;
}

function GamePageHeader({
  isButtonDisabled,
  isGameEnded,
}: IGamePageHeaderProps) {
  const userBalance = getUserBalance();
  const { address } = useAccount();

  return (
    <header className="flex h-16 justify-end items-center p-4">
      {address && (
        <div className="flex flex-row mr-3 gap-1">
          Game balance: {userBalance}
        </div>
      )}
      <ModeToggle />
      <ConnectButton
        isButtonDisabled={isButtonDisabled}
        isGameEnded={isGameEnded}
      />
    </header>
  );
}

export default React.memo(GamePageHeader);
