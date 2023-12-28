"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { JOIN } from "@/app/api/route";
import WsApiService, { CountDown, SessionStat } from "@/app/api/WsApiService";

const DUMMY_TEXT = "lorem ipsum";

const GamePage = () => {
  const [copied, setCopied] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [startBtnText, setStartBtnText] = useState("Start the game");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userProgress, setUserProgress] = useState<{ [key: string]: number }>(
    {}
  );
  const [textIsBlurred, setTextIsBlurred] = useState(false);
  const [textInputStyles, setTextInputStyles] = useState<string[]>([]);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorIsVisible, setCursorIsVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const id = params.id;
  const apiServiceRef = useRef<WsApiService | null>(null);

  const formattedText = DUMMY_TEXT.split("").map((char, index) => (
    <span key={index}>{char}</span>
  ));

  function returnFocusOnClick(e: MouseEvent) {
    e.stopPropagation();
    setTextIsBlurred(false);
    inputRef.current?.focus();
    console.log("MODAL", textIsBlurred);
  }

  function handleClickFormattedText(e) {
    setTextIsBlurred(false);
    inputRef.current?.focus();
    console.log("TEXT", textIsBlurred, e.target);
  }

  function handleBlurChanger(e) {
    setTextIsBlurred(true);
  }

  function onProgressReceived(stat: SessionStat) {
    const newProgress = {};
    stat.users.forEach((user) => {
      newProgress[user.id] = user.progress;
    });

    console.log("New progress:", newProgress);

    setUserProgress(newProgress);

    if (newProgress[localStorage.getItem("userId")] === 100) {
      setIsGameEnded(true);
    }
  }

  function onCountDownReceived(response: CountDown) {
    let count = response.count;
    if (count > 0) {
      setStartBtnText(count.toString());
    }
    if (count <= 0) {
      setStartBtnText("Game started");
      setIsButtonDisabled(true);
      setTextVisible(true);
      inputRef.current?.focus();
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = async (id: string) => {
    setIsButtonDisabled(true);
    console.log("Starting the game...");
    const response = await JOIN(id);
    const data = await response.json();
    localStorage.setItem("userId", data.userId);
  };

  function checkEqualHandler(e) {
    const enteredTextLength = e.target.value.length;

    setCursorPosition(enteredTextLength - 1);

    const newTextStyles = Array.from(
      { length: enteredTextLength },
      (_, i) => "black"
    );

    for (let i = 0; i < enteredTextLength; i++) {
      if (e.target.value[i] !== formattedText[i]?.props.children) {
        newTextStyles[i] = "orangered";
      }
    }

    setTextInputStyles(newTextStyles);

    if (!apiServiceRef.current) {
      console.error("apiService is not defined");
      return;
    } else if (
      e.target.value.slice(0, enteredTextLength) ===
      DUMMY_TEXT.slice(0, enteredTextLength)
    ) {
      const progress = Math.round(
        (enteredTextLength / formattedText.length) * 100
      );
      console.log("Progress:", progress);
      const userId = localStorage.getItem("userId");
      apiServiceRef.current.sendStat(userId, progress);

      if (e.target.value === DUMMY_TEXT && isGameEnded) {
        inputRef.current.disabled = true;
      }
    }
  }

  useEffect(() => {
    const cursorInterval = setInterval(
      () => setCursorIsVisible((prev) => !prev),
      500
    );

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const sessionId: string = window.location.href.split("/").pop() as string;
    apiServiceRef.current = new WsApiService(
      sessionId,
      onCountDownReceived,
      onProgressReceived
    );
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <div className="flex flex-col gap-2 mb-3">
        <p>Progress</p>

        {Object.keys(userProgress).length > 0 ? (
          Object.entries(userProgress).map(([userId, userProgress]) => (
            <div
              key={userId}
              className="w-[700px] relative bg-gray-300 border-2 border-gray-500 rounded-sm h-8 overflow-hidden"
              id="progress"
            >
              <div
                key={userId}
                className="bg-blue-300 h-full"
                style={{ width: `${userProgress}%` }}
              >
                {userId.slice(-5)}
                {userId === localStorage.getItem("userId") ? "(you)" : ""}
              </div>
              <span className="absolute right-0 top-0">
                {userProgress === 100 ? "🥇" : ""}
              </span>
            </div>
          ))
        ) : (
          <>
            <div
              className="w-[700px] bg-gray-300 border-2 border-gray-500 rounded-sm h-8"
              id="progress"
            >
              Guest (you)
            </div>
            <div className="w-[700px] bg-gray-300 border-2 border-gray-500 rounded-sm h-8">
              Guest
            </div>
          </>
        )}
      </div>
      <button
        id="start_btn"
        className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
          isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handleStartGame(id as string)}
        disabled={isButtonDisabled}
      >
        {startBtnText}
      </button>
      {textVisible && (
        <div className="relative" onClick={handleClickFormattedText}>
          <div
            id="text"
            className={`w-[1000px] mt-5 mb-5 filter text-gray-500 text-xl font-medium ${
              textIsBlurred ? "blur-[2px]" : ""
            }`}
          >
            {formattedText.map((char, index) => (
              <span
                key={index}
                style={{
                  color: textInputStyles[index],
                  borderRight:
                    cursorPosition === index && cursorIsVisible
                      ? "2px solid black"
                      : "none",
                }}
              >
                {char}
              </span>
            ))}
          </div>
          {textIsBlurred && (
            <div
              onClick={returnFocusOnClick}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full flex justify-center items-center cursor-pointer"
            >
              <p>👉 Click here to focus 👈</p>
            </div>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        className="opacity-0 cursor-default"
        id="result"
        onChange={checkEqualHandler}
        onBlur={handleBlurChanger}
        disabled={isGameEnded}
      ></input>
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
