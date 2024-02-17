"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { connectWallet, formatWallet } from "./helpers";
import { handleCreateNewGameSession } from "./helpers/createNewGameSession";

import DropDownFaucetMenu from "./components/dropdown/dropdownFaucetMenu";
import Footer from "./components/footer/footer";
import { Twitter } from "./public/icons/twitter";
import ApiDomainService from "@/app/api/ApiDomainService";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const router = useRouter();

  async function handleTryDuelModeButton() {
    const data = await handleCreateNewGameSession();
    localStorage.setItem("userId", crypto.randomUUID());

    if (data) {
      router.push(`/game/${data.id}`);
    }
  }

  async function login() {
    console.log("login");
    if (!window.ethereum) {
      console.error('Please install MetaMask');
      return;
    }

    // Prompt user to connect MetaMask
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    const address = accounts[0];

    // Receive nonce and sign a message
    const nonce = await getNonce(address);
    const message = `Signing a message to login: ${nonce}`;
    const signature = await window.ethereum.request({method: 'personal_sign', params: [message, address]});

    // Login with signature
    await sendLoginData(address, signature);
  }

  async function getNonce(address:any) {
    const apiUrl = new ApiDomainService().getSecRestUrl();
    return await fetch(`${apiUrl}/nonce/${address}`)
      .then(response => response.text());
  }

  async function sendLoginData(address:string, signature:string) {
    const apiUrl = new ApiDomainService().getSecRestUrl();
    return fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({
        address: encodeURIComponent(address),
        signature: encodeURIComponent(signature)
      })
    }).then((response) => {
      // console.log(response)
      // return true;
      return window.location.href = response.url;
    });
  }

  async function handleConnectWallet() {
    const walletAddress = await connectWallet();
    if (walletAddress) {
      setWallet(formatWallet(walletAddress));
      localStorage.setItem("walletId", walletAddress);
    }
  }

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);
  });
  // useLayoutEffect(() => {
  //   setIsSmallScreen(window.innerWidth < 768);
  // });

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
            <Link
              className=" pl-2"
              href="https://x.com/retypemexyz"
              target="_blank"
            >
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
            <div
              className="absolute w-80 h-10 -top-1.5 -left-4 bg-gradient-to-br from-pink-400 via-pink-500 to-purple-800 rounded-full p-4 filter blur-sm rotate-[-1.5deg]"></div>
            <div className="relative z-10 font-semibold text-white">
              Try Beta on Polygon Mumbai Testnet
            </div>
          </div>
          <div className="form-signin">
            <h3 className="form-signin-heading">Please sign in</h3>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={login}>Login with MetaMask
            </button>
          </div>
          <div className="flex flex-row gap-5">
            <DropDownFaucetMenu/>
            <button
              className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 mr-8"
              onClick={handleConnectWallet}
            >
              {wallet ? wallet : "Connect wallet"}
            </button>
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
