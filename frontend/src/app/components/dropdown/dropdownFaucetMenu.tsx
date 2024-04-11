import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

function DropdownFaucetMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded mr-3"
          aria-label="Customise options"
        >
          Claim Testnet Tokens:
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-48 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Group>
            <DropdownMenu.Label className="text-sm px-3 py-1">
              Matic Polygon Amoy
            </DropdownMenu.Label>
            <Link
              href="https://www.alchemy.com/faucets/polygon-amoy"
              target="_blank"
            >
              <DropdownMenu.Item className="hover:bg-gray-300 group text-sm leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                Alchemy faucet
              </DropdownMenu.Item>
            </Link>
            <Link href="https://faucet.polygon.technology/" target="_blank">
              <DropdownMenu.Item className="hover:bg-gray-300 group text-sm leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                Polygon faucet
              </DropdownMenu.Item>
            </Link>
            <Link
              href="https://faucet.trade/polygon-amoy-matic-faucet"
              target="_blank"
            >
              <DropdownMenu.Item className="hover:bg-gray-300 group text-sm leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                Faucet trade
              </DropdownMenu.Item>
            </Link>
          </DropdownMenu.Group>

          <DropdownMenu.Separator className="h-[1px] bg-gray-300 m-[4px]" />

          <DropdownMenu.Group>
            <DropdownMenu.Label className="text-sm px-3 py-1">
              ETH Blast Sepolia
            </DropdownMenu.Label>
            <Link
              href="https://blastapi.io/faucets/blastl2-testnet"
              target="_blank"
            >
              <DropdownMenu.Item className="hover:bg-gray-300 group text-sm leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                Blastapi faucet
              </DropdownMenu.Item>
            </Link>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default React.memo(DropdownFaucetMenu);
