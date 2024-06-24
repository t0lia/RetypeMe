import React from "react";
import ConnectButton from "../connect-button/connectButton";
import ModeToggle from "@/app/components/ui/toggle-theme-changer";
import Logo from "../logo/logo";
import DropdownFaucetMenu from "../dropdown/dropdownFaucetMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSIWE } from "connectkit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/app/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import { BlackCreateWalletButton } from "../black-create-wallet-button/blackCreateWalletButton";

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
  const { isSignedIn } = useSIWE();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <header className="flex h-16 justify-between items-center">
      <Logo />
      <div className="flex justify-end items-center p-4">
        <ModeToggle />
        {dropDownFaucetMenu && <DropdownFaucetMenu />}
        {!isConnected && <BlackCreateWalletButton />}
        <ConnectButton
          isButtonDisabled={isButtonDisabled}
          isGameEnded={isGameEnded}
        />
        {isSignedIn && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="ml-2">
                <AvatarImage
                  src="https://github.com/retypeme.png"
                  alt="user logo"
                />
                <AvatarFallback>RTM</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <Link href={`/user/${address}`} target="_self">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => disconnect()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

export default React.memo(GamePageHeader);
