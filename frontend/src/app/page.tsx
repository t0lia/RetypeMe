"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { CREATE } from "./api/route";
import { connectWallet, formatWallet } from "./helpers";

import DropDownFaucetMenu from "./components/dropdown/dropdownFaucetMenu";

export default function Home() {
  const [wallet, setWallet] = useState("");

  const router = useRouter();

  async function handleCreateNewGameSession() {
    const response = await CREATE({ players: 2 });
    const data = await response.json();
    console.log(data);

    if (data) {
      router.push(`/game/${data.id}`);
    }
  }

  async function handleConnectWallet() {
    const walletAddress = await connectWallet();
    if (walletAddress) {
      setWallet(formatWallet(walletAddress));
      localStorage.setItem("userId", walletAddress);
    }
  }

  return (
    <main className="h-screen flex flex-col">
      <nav className="flex justify-between h-16 items-center">
        <div className="relative ml-8">
          <div className="absolute w-80 h-10 -top-1 -left-2 bg-gradient-to-br from-pink-400 via-pink-500 to-purple-800 rounded-full p-4 filter blur-sm rotate-[-1.5deg]"></div>
          <div className="relative z-10 font-semibold text-white">
            We are Live on Polygon Mumbai Testnet
          </div>
        </div>
        <DropDownFaucetMenu />
        <button
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 mr-8"
          onClick={handleConnectWallet}
        >
          {wallet ? wallet : "Connect wallet"}
        </button>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <button
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
          onClick={handleCreateNewGameSession}
        >
          RetypeMe
        </button>
      </div>
    </main>
  );
}
