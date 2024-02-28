"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { connectWallet, formatWallet } from "./helpers";
import { handleCreateNewGameSession } from "./helpers/create-new-game-session";

import DropDownFaucetMenu from "./components/dropdown/dropdownFaucetMenu";
import Footer from "./components/footer/footer";
import { Twitter } from "./public/icons/twitter";
import RestApiService from "./api/rest-api-service";
import { Exit } from "./public/icons/exit";
import { TWITTER_LINK } from "./constants/links";

export default function Home() {
  const [streamingText, setStreamingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [authData, setAuthData] = useState({
    username: null,
    isAuthenticated: false,
  });

  const router = useRouter();

  async function handleTryDuelModeButton() {
    const data = await handleCreateNewGameSession();
    localStorage.setItem("userId", crypto.randomUUID());

    if (data) {
      router.push(`/game/${data.id}`);
    }
  }

  async function handleConnectWallet() {
    await connectWallet();
    const authResponse: any = await new RestApiService().fetchAuthData();
    setAuthData(authResponse);
    const walletAddress = authResponse.username;
    if (walletAddress) {
      localStorage.setItem("walletId", walletAddress);
    }
  }
  async function logoff() {
    await new RestApiService().logout();
    localStorage.removeItem("walletId");
    const authResponse: any = await new RestApiService().fetchAuthData();
    setAuthData(authResponse);
  }

  useEffect(() => {
    const authResponse: any = new RestApiService().fetchAuthData();
    authResponse.then((auth: any) => {
      setAuthData(auth);
    });
  }, []);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);
  });

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
            </Link>{" "}
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <header>
        <div className="flex justify-between h-16 items-center">
          <div className="relative ml-8">
            <div className="absolute w-80 h-10 -top-1.5 -left-4 bg-gradient-to-br from-pink-400 via-pink-500 to-purple-800 rounded-full p-4 filter blur-sm rotate-[-1.5deg]"></div>
            <div className="relative z-10 font-semibold text-white">
              Try Beta on Polygon Mumbai Testnet
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <DropDownFaucetMenu />
            {authData.isAuthenticated ? (
              <div className="flex">
                <div className="bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded">
                  {formatWallet(authData.username)}
                </div>
                <button
                  className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform -ml-2 mr-8"
                  onClick={logoff}
                >
                  <Exit />
                </button>
              </div>
            ) : (
              <button
                className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 mr-8"
                onClick={handleConnectWallet}
              >
                Connect wallet
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="h-screen flex flex-col">
        <div className="flex flex-col flex-1 justify-center items-center gap-20">
          <button
            className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
            onClick={handleTryDuelModeButton}
          >
            Try Duel Mode
          </button>
          <div className="self-start pl-40 h-8">{streamingText}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
