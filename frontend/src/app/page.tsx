"use client";

import "./page.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import handleCreateNewGameSession from "./helpers/create-new-game-session";

import Footer from "./components/footer/footer";
import { Twitter } from "./public/icons/twitter";

import { TWITTER_LINK } from "./constants/links";
import { useModal, useSIWE } from "connectkit";
import { useAccount } from "wagmi";
import { Button } from "./components/ui/button";
import { useConfigStore } from "@/app/store/configStore";
import Image from "next/image";
import keyboard from "./public/assets/keyboard.webp";
import { LeaderboardCard } from "./components/leaderboard-card/leaderboardCard";
import GamePageHeader from "./components/game-page-header/gamePageHeader";

export default function Home() {
  const [streamingText, setStreamingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [buttonText, setButtonText] = useState("Connect Wallet");

  const router = useRouter();
  const { isSignedIn } = useSIWE();
  const { isConnected } = useAccount();
  const { setOpen, openSIWE } = useModal();
  const { contractConfig } = useConfigStore();

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
    let intervalId: NodeJS.Timeout;

    const startInterval = () => {
      intervalId = setInterval(() => {
        setStreamingText((prevText) => {
          const newText = texts[textIndex];
          if (charIndex < newText.length) {
            return newText.substring(0, charIndex + 1);
          } else {
            clearInterval(intervalId);

            setTimeout(() => {
              charIndex = 0;
              setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
            }, 2000);

            return newText;
          }
        });
        charIndex++;
      }, 60);
    };

    const timeoutId = setTimeout(startInterval, 2000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
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
    <div className="flex flex-col h-screen">
      <GamePageHeader dropDownFaucetMenu={true} />
      <main className="h-screen flex flex-col relative">
        <div className="flex flex-col flex-1 justify-center items-center gap-20">
          <Button
            className="transform active:translate-y-0.5"
            onClick={handleTryDuelModeButton}
          >
            {buttonText}
          </Button>
          <div className="self-start pl-40 h-8 text-2xl w-[50%] tracking-tight leading-snug relative">
            {streamingText}
            <span className="animate-caret w-4 bg-current h-7 inline-block translate-y-0.5 absolute"></span>
          </div>
          <div className="absolute top-4 right-0">
            <LeaderboardCard />
          </div>
        </div>
        <Image
          width={0}
          height={0}
          alt="keyboard"
          src={keyboard}
          className="absolute -bottom-48 -right-48 -z-10 h-[600px] w-auto"
          priority
        />
      </main>
      <Footer />
    </div>
  );
}
