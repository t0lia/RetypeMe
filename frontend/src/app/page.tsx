"use client";
import { useState } from "react";
import { CREATE } from "./api/route";
import { useRouter } from "next/navigation";

import { handleConnectWallet, shortWalletName } from "./helpers/helpers";

export default function Home() {
  const [wallet, setWallet] = useState("");

  const router = useRouter();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const response = await CREATE({ players: 2 });
    const data = await response.json();
    console.log(data);

    if (data) {
      router.push(`/game/${data.id}`);
    }
  }

  // async function handleConnectWallet() {
  //   console.log("wallet connected");
  //   const { ethereum } = window;

  //   try {
  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     const walletAddress = accounts[0];
  //     setWallet(shortWalletName(walletAddress));
  //     localStorage.setItem("userId", walletAddress);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  async function onClickConnectButton() {
    const walletAddress = await handleConnectWallet();
    setWallet(shortWalletName(walletAddress));
    localStorage.setItem("userId", walletAddress);
  }

  return (
    <main>
      <nav className="flex justify-end">
        <button
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 mr-8 mt-7"
          onClick={onClickConnectButton}
        >
          {wallet ? wallet : "Connect wallet"}
        </button>
      </nav>
      <div className="flex items-center justify-center min-h-screen py-2">
        <button
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
          onClick={handleClick}
        >
          Retype Me
        </button>
      </div>
    </main>
  );
}
