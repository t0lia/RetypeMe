"use client";

import { useCallback, useState } from "react";

const GamePage = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleStartGame = useCallback(() => {
    console.log("Starting the game...");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      {
        <button
          className="ml-5 mb-5 bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
          onClick={handleStartGame}
        >
          Start the game
        </button>
      }
      <div className="absolute left-3 bottom-3 ">
        <button
          className="ml-5 mb-5 bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Click to copy game URL"}
        </button>
      </div>
    </div>
  );
};

export default GamePage;
