"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { JOIN } from "@/app/api/route";
import WsApiService, {
  CountDown,
  SessionStat,
  User,
} from "@/app/api/WsApiService";
import { formatWallet } from "@/app/helpers";
import { connectWallet } from "@/app/helpers";
import { userDeposit } from "@/app/contractUtils/userDeposit";
import { withdrawWinnings } from "@/app/contractUtils/claimWinnings";
import { handleCreateNewGameSession } from "@/app/helpers/createNewGameSession";

import "./page.css";

const GamePage = () => {
  const [copied, setCopied] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [startBtnText, setStartBtnText] = useState("Start the game");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userStats, setUserStats] = useState<User[]>([]);
  const [textIsBlurred, setTextIsBlurred] = useState(false);
  const [textInputStyles, setTextInputStyles] = useState<string[]>([]);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [gameText, setGameText] = useState("");
  const [initialGameText, setInitialGameText] = useState("");
  const [ingameUserId, setIngameUserId] = useState("");
  const [txSuccessful, setTxSuccessful] = useState(false);
  const [successfulWithdrawlWinnings, setSuccessfulWithdrawlWinnings] =
    useState(false);
  const [keyStrokeCount, setKeyStrokeCount] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const apiServiceRef = useRef<WsApiService | null>(null);

  const formattedText = gameText
    .split("")
    .map((char, index) => <span key={index}>{char}</span>);

  function returnFocusOnClick(e: MouseEvent) {
    e.stopPropagation();
    setTextIsBlurred(false);
    inputRef.current?.focus();
  }

  function handleClickFormattedText() {
    setTextIsBlurred(false);
    inputRef.current?.focus();
  }

  function handleBlurChanger() {
    setTextIsBlurred(true);
  }

  function onProgressReceived(stat: SessionStat) {
    setUserStats(
      stat.users.map((user) => ({
        id: user.id,
        progress: user.progress,
        cpm: user.cpm,
        place: user.place,
      }))
    );

    if (
      stat.users.find((user) => user.id === localStorage.getItem("userId"))
        ?.progress === 100
    ) {
      // setTxSuccessful(false); // check if it is in the right place?

      // Start the New game
      setStartBtnText("New Game");
    }

    // if all users finishes typing
    if (stat.users.every((user) => user.progress === 100)) {
      setGameText("");
      setTextVisible(false);
      setIsButtonDisabled(false);
      setIsGameEnded(false);
      setCompletedWords([]);
      setTextInputStyles([]);
      inputRef.current.value = "";
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
      setGameText(response.text);
      setInitialGameText(response.text);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (localStorage !== null) {
      setIngameUserId(localStorage.getItem("userId"));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = () => {
      if (textIsBlurred) {
        setKeyStrokeCount((prev) => prev + 1);
        setTextIsBlurred(false);
      }
      if (!textIsBlurred && keyStrokeCount === 1) {
        inputRef.current?.focus();
        setKeyStrokeCount(0);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [textIsBlurred, keyStrokeCount]);

  async function handleStartGame(id: string) {
    if (startBtnText === "New Game") {
      const data = await handleCreateNewGameSession();
      if (data) {
        router.push(`/game/${data.id}`);
      }
    }
    setIsButtonDisabled(true);
    const response = await JOIN(id, localStorage.getItem("userId"));
    const data = await response.json();
    localStorage.setItem("userId", data.userId);
    setUserStats([]); // shoul it be here?
  }

  function checkEqualHandler(e) {
    const enteredText = e.target.value;

    const enteredTextLength = enteredText.length;

    const newTextStyles = Array.from(
      { length: enteredTextLength },
      (_, i) => "black"
    );
    let hasMistake = false;

    for (let i = 0; i < enteredTextLength; i++) {
      if (enteredText[i] !== formattedText[i]?.props.children) {
        newTextStyles[i] = "orangered";
        hasMistake = true;

        if (gameText[i] === " " && enteredText[i] !== " ") {
          setGameText((prev) => {
            const newGameText = prev.split("");
            newGameText[i] = enteredText[i];
            return newGameText.join("");
          });
        }
      }
    }

    setTextInputStyles(newTextStyles);

    if (gameText === enteredText) {
      const progress = Math.round(
        (enteredTextLength / formattedText.length) * 100
      );

      apiServiceRef.current.sendStat(ingameUserId, progress);

      setIsGameEnded(true);
    }

    if (!hasMistake) {
      if (
        (gameText.startsWith(enteredText) &&
          gameText[enteredTextLength] === " ") ||
        gameText === enteredText
      ) {
        const progress = Math.round(
          (enteredTextLength / formattedText.length) * 100
        );
        apiServiceRef.current.sendStat(ingameUserId, progress);

        setCompletedWords((prevCompletedWords) => [
          ...prevCompletedWords,
          enteredText.split(" ").pop(),
        ]);
      }
    }
  }

  function handleKeyDown(e) {
    if (
      e.key === "Backspace" &&
      lastEnteredWordIsCorrect() &&
      initialGameText.startsWith(inputRef.current.value)
    ) {
      e.preventDefault();
    }
    if (e.key === "Backspace" && gameText !== initialGameText) {
      setGameText(initialGameText);
    }
  }

  function lastEnteredWordIsCorrect() {
    const enteredWords = inputRef.current.value.trim().split(" ");
    const lastEnteredWord = enteredWords[enteredWords.length - 1];
    return completedWords[completedWords.length - 1] === lastEnteredWord;
  }

  useEffect(() => {
    const sessionId: string = window.location.href.split("/").pop() as string;
    apiServiceRef.current = new WsApiService(
      sessionId,
      onCountDownReceived,
      onProgressReceived
    );
    sessionStorage.setItem("sessionId", sessionId);
  }, []);

  async function onClickConnectButton() {
    const walletAddress = await connectWallet();
    if (walletAddress) {
      setIngameUserId(formatWallet(walletAddress));
      localStorage.setItem("userId", walletAddress);
    }
  }

  async function handleUserDeposit() {
    const response = await userDeposit();
    if (response && response.status === 1) {
      setTxSuccessful(true);
    }
  }

  async function handleClaimWinnings() {
    const response = await withdrawWinnings();
    console.log(response);
    if (response && response.status === 1) {
      setSuccessfulWithdrawlWinnings(true);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      {ingameUserId?.startsWith("0x") ? (
        <button
          disabled={isButtonDisabled}
          className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {formatWallet(ingameUserId)}
        </button>
      ) : (
        <button
          disabled={isButtonDisabled}
          onClick={onClickConnectButton}
          className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Connect wallet
        </button>
      )}
      <div className="flex flex-col gap-2 mb-3">
        <p>Progress</p>
        {userStats.length > 0 ? (
          userStats.map((user) => (
            <div
              key={user.id}
              className="w-[700px] relative bg-gray-300 border-2 border-gray-500 rounded-sm h-8 overflow-hidden"
              id="progress"
            >
              <div
                key={user.id}
                className="bg-blue-300 h-full"
                style={{ width: `${user.progress}%` }}
              >
                <span className="ml-1">
                  {formatWallet(user.id)}
                  {user.id === localStorage.getItem("userId") ? "(you)" : ""}
                </span>
              </div>
              <span className="absolute right-0 top-0 mr-1">
                {user.progress === 100 && user.place === 1 && (
                  <>
                    <span>🎉 CPM: </span>
                    <b className="font-semibold">{user.cpm}</b>
                    <span> Place: 🥇</span>
                  </>
                )}
                {user.progress === 100 && user.place === 2 && (
                  <>
                    <span>🎉 CPM: </span>
                    <b className="font-semibold">{user.cpm}</b>
                    <span> Place: 🥈</span>
                  </>
                )}
                {user.progress === 100 && user.place === 3 && (
                  <>
                    <span>🎉 CPM: </span>
                    <b className="font-semibold">{user.cpm}</b>
                    <span> Place: 🥉</span>
                  </>
                )}
                {user.progress === 100 && user.place > 3 && (
                  <>
                    <span>CPM: </span>
                    <b className="font-semibold">{user.cpm}</b>
                    <span>
                      {" "}
                      Place: <b>{user.place} 😭</b>
                    </span>
                  </>
                )}
              </span>
            </div>
          ))
        ) : (
          <>
            <div
              className="w-[700px] bg-gray-300 border-2 border-gray-500 rounded-sm h-8"
              id="progress"
            >
              <span className="ml-1">
                {ingameUserId ? formatWallet(ingameUserId) : "Guest"} (you)
              </span>
            </div>
            <div className="w-[700px] bg-gray-300 border-2 border-gray-500 rounded-sm h-8">
              <span className="ml-1">Guest</span>
            </div>
          </>
        )}
      </div>
      {ingameUserId?.startsWith("0x") && !txSuccessful ? (
        <button
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 "
          onClick={handleUserDeposit}
        >
          Click to deposit 0.1 Matic
        </button>
      ) : (
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
      )}
      {textVisible && (
        <div className="relative" onClick={handleClickFormattedText}>
          <div
            id="text"
            className={`w-[1000px] mt-5 mb-5 filter text-gray-500 text-xl font-medium ${
              textIsBlurred ? "blur-[3px]" : ""
            }`}
          >
            {formattedText.map((char, index) => (
              <span key={index} style={{ color: textInputStyles[index] }}>
                {textInputStyles.length < 1 && index === 0 && (
                  <div className="absolute w-0.5 h-6 -mb-1 bg-black inline-block animate-cursor"></div>
                )}
                {char}
                {textInputStyles.length === index + 1 && (
                  <div className="absolute w-0.5 h-6 -mb-1 bg-black inline-block animate-cursor"></div>
                )}
              </span>
            ))}
          </div>
          {textIsBlurred && (
            <div
              onClick={returnFocusOnClick}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full flex justify-center items-center cursor-pointer"
            >
              <p className="text-xl font-semibold">
                👉 Click here or start typing to continue 👈
              </p>
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
        onKeyDown={handleKeyDown}
        autoComplete="off"
      ></input>
      {ingameUserId?.startsWith("0x") &&
        userStats.map((user) => {
          if (
            user.place === 1 &&
            user.id === ingameUserId &&
            !successfulWithdrawlWinnings
          ) {
            return (
              <button
                key={user.id}
                className="mb-5 bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 animation-pulse"
                onClick={handleClaimWinnings}
              >
                Claim winnings 🏆
              </button>
            );
          }
        })}
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
