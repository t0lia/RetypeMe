import React from "react";
import ConnectButton from "../connect-button/connectButton";
import ModeToggle from "@/app/components/ui/toggle-theme-changer";
import Logo from "../logo/logo";
import DropdownFaucetMenu from "../dropdown/dropdownFaucetMenu";

interface IGamePageHeaderProps {
  isButtonDisabled?: boolean;
  isGameEnded?: boolean;
  dropDownFaucetMenu?: boolean;
}

function GamePageHeader({
  isButtonDisabled,
  isGameEnded,
  dropDownFaucetMenu,
}: IGamePageHeaderProps) {
  return (
    <header className="flex h-16 justify-between items-center">
      <Logo />
      <div className="flex justify-end items-center p-4">
        <ModeToggle />
        {dropDownFaucetMenu && <DropdownFaucetMenu />}
        <ConnectButton
          isButtonDisabled={isButtonDisabled}
          isGameEnded={isGameEnded}
        />
      </div>
    </header>
  );
}

export default React.memo(GamePageHeader);
