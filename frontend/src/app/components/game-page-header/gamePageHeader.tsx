import React from "react";
import ConnectButton from "../connect-button/connectButton";

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
      <ConnectButton
        isButtonDisabled={isButtonDisabled}
        isGameEnded={isGameEnded}
      />
    </header>
  );
}

export default React.memo(GamePageHeader);
