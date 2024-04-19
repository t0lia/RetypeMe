"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import handleCreateNewGameSession from "./helpers/create-new-game-session";

import DropDownFaucetMenu from "./components/dropdown/dropdownFaucetMenu";
import Footer from "./components/footer/footer";
import ConnectButton from "./components/connect-button/connectButton";
import { Twitter } from "./public/icons/twitter";

import { TWITTER_LINK } from "./constants/links";
import { useModal, useSIWE } from "connectkit";
import { useAccount } from "wagmi";
import { Button } from "./components/ui/button";

export default function Home() {
  const [streamingText, setStreamingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [buttonText, setButtonText] = useState("Connect Wallet");

  const router = useRouter();
  const { isSignedIn } = useSIWE();
  const { isConnected } = useAccount();
  const { setOpen, openSIWE } = useModal();

  useEffect(() => {
    if (isConnected && !isSignedIn) {
      setButtonText("Please Sign In");
    } else if (isConnected && isSignedIn) {
      setButtonText("Try Duel Mode");
    } else {
      setButtonText("Connect Wallet");
    }
  }, [isConnected, isSignedIn]);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);
  });

  async function startGameSessionAfterSigIn() {
    if (isConnected && isSignedIn) {
      const data = await handleCreateNewGameSession();
      localStorage.setItem("userId", crypto.randomUUID());

      if (data) {
        router.push(`/game/${data.id}`);
      }
    }
  }

  async function handleTryDuelModeButton() {
    try {
      if (!isSignedIn && isConnected) {
        openSIWE(true);
        setOpen(false);
      }
      if (!isConnected) {
        setOpen(true);
      }
      startGameSessionAfterSigIn();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const texts = [
      "Master blind typing skills, race against friends, and own your achievements as NFTs on RetypeMe",
      "Be part of a dynamic community shaping the platform's future through voting and communication",
      "Compete for NFT rewards, with the chance to win your opponent's car, inspired by the Fast and the Furious movie!",
    ];

    let charIndex = 0;
    const intervalId = setInterval(() => {
      setStreamingText(() => {
        const newText = texts[textIndex];

        if (charIndex < newText.length) {
          return newText.substring(0, charIndex + 1);
        } else {
          clearInterval(intervalId);

          setTimeout(() => {
            charIndex = 0;
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }, 1000);

          return newText;
        }
      });
      charIndex++;
    }, 50);

    return () => clearInterval(intervalId);
  }, [textIndex]);

  if (isSmallScreen) {
    return (
      <main className="flex flex-col h-screen justify-center bg-gradient-to-br from-indigo-600 to-violet-700 text-xl gap-32">
        <div className="text-center">Explore on Desktop</div>
        <div className="px-3 flex flex-col">
          <div className="h-8 mb-16">{streamingText}</div>
          <div className="self-center">Join us:</div>
          <div className="self-center">
            <Link className=" pl-2" href={TWITTER_LINK} target="_blank">
              <Twitter width={36} height={40} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="px-2 flex flex-col h-screen">
      <header>
        <div className="flex justify-between h-16 items-center">
          <div className="relative ml-8">
            <div className="absolute w-80 h-10 -top-1.5 -left-4 bg-gradient-to-br from-pink-400 via-pink-500 to-purple-800 rounded-full p-4 filter blur-sm rotate-[-1.5deg]"></div>
            <div className="relative z-10 font-semibold text-white">
              Polygon Amoy & Blast Sepolia Testnet
            </div>
          </div>

          <div className="flex flex-row">
            <DropDownFaucetMenu />
            <ConnectButton />
          </div>
        </div>
      </header>
      <main className="h-screen flex flex-col">
        <div className="flex flex-col flex-1 justify-center items-center gap-20">
          <Button
            // className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
            className="transform active:translate-y-0.5"
            onClick={handleTryDuelModeButton}
          >
            {buttonText}
          </Button>
          <div className="self-start pl-40 h-8">{streamingText}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
