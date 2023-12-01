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
    <div className="flex flex-col items-center  min-h-screen py-2">
      <div className="flex flex-col gap-2 mb-3">
        <p>Progress</p>
        <div className="w-[1000px] bg-slate-400 border-2 border-gray-500  rounded-sm">
          Guest (you)
        </div>
        <div className="w-[1000px] bg-slate-400 border-2 border-gray-500  rounded-sm">
          Guest
        </div>
      </div>
      <button
        className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
        onClick={handleStartGame}
      >
        Start the game
      </button>
      <div className="w-[1000px] mt-5 mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
        corrupti officia sequi voluptas ullam quia quas labore molestias? Sit
        ipsum qui ducimus quod nemo soluta fugiat quos modi quaerat debitis.
      </div>

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
