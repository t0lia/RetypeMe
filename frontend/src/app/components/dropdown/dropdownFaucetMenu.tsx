import * as React from "react";
import Link from "next/link";

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
import { Button } from "../ui/button";

function DropdownFaucetMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mr-3" aria-label="Customise options">
          Claim Testnet Tokens:
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent sideOffset={5}>
          {/* <DropdownMenuGroup>
            <DropdownMenuLabel className="text-sm px-3 py-1">
              ETH Scroll Sepolia
            </DropdownMenuLabel>
            <Link href="https://scroll.faucetme.pro/" target="_blank">
              <DropdownMenuItem className="flex items-center cursor-pointer pl-[25px]">
                Faucetme
              </DropdownMenuItem>
            </Link>

            <Link
              href="https://bwarelabs.com/faucets/scroll-testnet"
              target="_blank"
            >
              <DropdownMenuItem className="flex items-center cursor-pointer pl-[25px]">
                BWARE Labs
              </DropdownMenuItem>
            </Link>

            <Link href="htthttps://www.l2faucet.com/scroll" target="_blank">
              <DropdownMenuItem className="flex items-center cursor-pointer pl-[25px]">
                L2faucet
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="h-[1px] bg-gray-300 m-[4px]" /> */}

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-sm px-3 py-1">
              BNB Faucet & Bridge
            </DropdownMenuLabel>
            <Link
              href="https://www.bnbchain.org/en/testnet-faucet"
              target="_blank"
            >
              <DropdownMenuItem className="flex items-center cursor-pointer pl-[25px]">
                BNB Faucet
              </DropdownMenuItem>
            </Link>
            <Link
              href="https://opbnb-bridge.bnbchain.org/deposit"
              target="_blank"
            >
              <DropdownMenuItem className="flex items-center cursor-pointer pl-[25px]">
                Bridge to opBNB
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          {/* <DropdownMenuSeparator className="h-[1px] bg-gray-300 m-[4px]" /> */}

          {/* <DropdownMenuGroup>
            <DropdownMenuLabel className="text-sm px-3 py-1">
              Matic Polygon Amoy
            </DropdownMenuLabel>
            <Link
              href="https://www.alchemy.com/faucets/polygon-amoy"
              target="_blank"
            >
              <DropdownMenuItem className="flex items-center cursor-pointer pl-[25px]">
                Alchemy faucet
              </DropdownMenuItem>
            </Link>
            <Link href="https://faucet.polygon.technology/" target="_blank">
              <DropdownMenuItem className="flex items-center cursor-pointer pl-[25px]">
                Polygon faucet
              </DropdownMenuItem>
            </Link>
            <Link
              href="https://faucet.trade/polygon-amoy-matic-faucet"
              target="_blank"
            >
              <DropdownMenuItem className="flex items-center cursor-pointer pl-[25px]">
                Faucet trade
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="h-[1px] bg-gray-300 m-[4px]" /> */}

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-sm px-3 py-1">
              ETH Blast Sepolia
            </DropdownMenuLabel>
            <Link
              href="https://blastapi.io/faucets/blastl2-testnet"
              target="_blank"
            >
              <DropdownMenuItem className="flex items-center cursor-pointer pl-[25px]">
                Blastapi faucet
              </DropdownMenuItem>
            </Link>
            <Link
              href="https://faucet.quicknode.com/blast/sepolia"
              target="_blank"
            >
              <DropdownMenuItem className="flex items-center cursor-pointer pl-[25px]">
                QuickNode faucet
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}

export default React.memo(DropdownFaucetMenu);
