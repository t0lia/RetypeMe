import React from "react";
import ConnectButton from "../connect-button/connectButton";
import ModeToggle from "@/app/components/ui/toggle-theme-changer";

interface IGamePageHeaderProps {
  isButtonDisabled: boolean;
  isGameEnded: boolean;
}

function GamePageHeader({
  isButtonDisabled,
  isGameEnded,
}: IGamePageHeaderProps) {
  return (
    <header className="flex h-16 justify-end items-center p-4">
      <ModeToggle />
      <ConnectButton
        isButtonDisabled={isButtonDisabled}
        isGameEnded={isGameEnded}
      />
    </header>
  );
}

export default React.memo(GamePageHeader);
