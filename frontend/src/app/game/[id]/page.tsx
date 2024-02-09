"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
  const [startBtnText, setStartBtnText] = useState("Start game");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userStats, setUserStats] = useState<User[]>([]);
  const [textIsBlurred, setTextIsBlurred] = useState(false);
  const [textInputStyles, setTextInputStyles] = useState<string[]>([]);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [gameText, setGameText] = useState("");
  const [initialGameText, setInitialGameText] = useState("");
  const [ingameUserId, setIngameUserId] = useState("");
  const [ingameWalletId, setIngameWalletId] = useState("");
  const [txSuccessful, setTxSuccessful] = useState(false);
  const [successfulWithdrawlWinnings, setSuccessfulWithdrawlWinnings] =
    useState(false);
  const [keyStrokeCount, setKeyStrokeCount] = useState(0);
  const [sessionStat, setSessionStat] = useState<SessionStat>({});

  const inputRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const wsApiServiceRef = useRef<WsApiService | null>(null);

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
    inputRef.current?.blur();
  }
  function onRegistrationReceived(stat: SessionStat) {
    setSessionStat(stat);
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
      setIsGameEnded(true);
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
      setIngameWalletId(localStorage.getItem("walletId"));
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

  async function handleStartGame() {
    if (startBtnText === "New Game") {
      const data = await handleCreateNewGameSession();
      if (data) {
        router.push(`/game/${data.id}`);
      }
    }
    setIsButtonDisabled(true);

    wsApiServiceRef.current?.register(
      localStorage.getItem("userId") ?? "",
      localStorage.getItem("walletId") ?? ""
    );

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
      if (enteredText[i] !== initialGameText[i]) {
        newTextStyles[i] = "orangered";
        hasMistake = true;

        if (gameText[i] === " " && enteredText[i] !== " ") {
          setGameText((prev) => {
            const newGameText = prev.split("");
            newGameText[i] = enteredText[i];
            return newGameText.join("");
          });
        }
      } else if (enteredText[i] === initialGameText[i] && !hasMistake) {
        newTextStyles[i] = "black";
      } else {
        newTextStyles[i] = "orangered";
      }
    }
    setTextInputStyles(newTextStyles);

    if (initialGameText === enteredText) {
      const progress = Math.round(
        (enteredTextLength / formattedText.length) * 100
      );

      wsApiServiceRef.current?.sendStat(ingameUserId, ingameWalletId, progress);

      setIsGameEnded(true);
    }

    if (!hasMistake) {
      if (
        (initialGameText.startsWith(enteredText) &&
          initialGameText[enteredTextLength] === " ") ||
        initialGameText === enteredText
      ) {
        const progress = Math.round(
          (enteredTextLength / formattedText.length) * 100
        );
        wsApiServiceRef.current?.sendStat(
          ingameUserId,
          ingameWalletId,
          progress
        );

        // setCompletedWords((prevCompletedWords) => {
        //   const enteredWords = enteredText.split(" ");
        //   const lastEnteredWord = enteredWords.pop();

        //   if (
        //     lastEnteredWord &&
        //     initialGameText.includes(lastEnteredWord) &&
        //     (
        //       initialGameText.match(
        //         new RegExp(`\\b${lastEnteredWord}\\b`, "g")
        //       ) || []
        //     ).length >
        //       prevCompletedWords.filter((word) => word === lastEnteredWord)
        //         .length
        //   ) {
        //     return [...prevCompletedWords, lastEnteredWord];
        //   }

        //   return prevCompletedWords;
        // });
        setCompletedWords((prevCompletedWords) => {
          const enteredWords = enteredText.split(" ");
          const lastEnteredWord = enteredWords.pop();

          if (lastEnteredWord && initialGameText.includes(lastEnteredWord)) {
            const lastEnteredIndex = initialGameText.indexOf(lastEnteredWord);

            // Check if the lastEnteredWord is at the correct position
            if (
              lastEnteredIndex !== -1 &&
              lastEnteredIndex ===
                initialGameText
                  .split(" ")
                  .filter((word) => prevCompletedWords.includes(word))
                  .join(" ").length
            ) {
              return [...prevCompletedWords, lastEnteredWord];
            }
          }

          return prevCompletedWords;
        });
      }
    } else if (enteredText.length > initialGameText.length) {
      setGameText(
        (prev) =>
          completedWords.join(" ") +
          prev.slice(completedWords.join(" ").length, initialGameText.length) +
          enteredText.slice(initialGameText.length)
      );
    }
  }

  function handleKeyDown(e: any) {
    if (
      e.key === "Backspace" &&
      // lastEnteredWordIsCorrect() &&
      initialGameText.startsWith(inputRef.current.value)
    ) {
      e.preventDefault();
    }
    if (
      e.ctrlKey &&
      e.key === "Backspace" &&
      initialGameText.startsWith(inputRef.current.value)
    ) {
      console.log("works");
      e.preventDefault();
    }
    if (e.key === "Backspace" && gameText !== initialGameText) {
      setGameText(initialGameText);
    }
  }
  // console.log(inputRef.current?.value.length > completedWords.join(" ").length);
  // console.log(inputRef.current?.value.length, completedWords.join(" ").length);
  // console.log(inputRef.current?.value, completedWords, gameText);

  function lastEnteredWordIsCorrect() {
    const enteredWords = inputRef.current?.value.trim().split(" ") ?? [];
    const lastEnteredWord = enteredWords[enteredWords.length - 1];
    return completedWords[completedWords.length - 1] === lastEnteredWord;
  }

  useEffect(() => {
    const sessionId: string = window.location.href.split("/").pop() as string;
    sessionStorage.setItem("sessionId", sessionId);

    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", crypto.randomUUID());
    }

    wsApiServiceRef.current = new WsApiService(
      sessionId,
      localStorage.getItem("userId") ?? "",
      localStorage.getItem("walletId") ?? "",
      onCountDownReceived,
      onProgressReceived,
      onRegistrationReceived
    );
  }, []);

  async function onClickConnectButton() {
    const walletAddress = await connectWallet();
    if (walletAddress) {
      setIngameWalletId(walletAddress);
      localStorage.setItem("walletId", walletAddress);

      wsApiServiceRef.current?.join(
        localStorage.getItem("userId") ?? "",
        localStorage.getItem("walletId") ?? ""
      );
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
    <>
      <header className="flex h-16 justify-end items-center p-4">
        {ingameWalletId != null && ingameWalletId != "" ? (
          <button
            disabled={isButtonDisabled}
            className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {formatWallet(ingameWalletId)}
          </button>
        ) : (
          <button
            disabled={isButtonDisabled || isGameEnded}
            onClick={onClickConnectButton}
            className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
              isButtonDisabled || isGameEnded
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Connect wallet
          </button>
        )}
      </header>
      <main className="flex flex-col items-center min-[h-screen-h-16] py-2">
        <div className="flex flex-col gap-2 mb-3">
          <p>Progress</p>
          {userStats.length > 0
            ? userStats.map((user) => (
                <div
                  key={user.id}
                  className="w-[700px] relative bg-gray-300 border-2 border-gray-500 rounded-sm h-8 overflow-hidden"
                >
                  <div
                    key={user.id}
                    className="bg-blue-300 h-full transition-all duration-200"
                    style={{ width: `${user.progress}%` }}
                  >
                    <span className="ml-1">
                      {sessionStat.users.map((userSession) => {
                        if (userSession.id === user.id)
                          return userSession.walletId
                            ? formatWallet(userSession.walletId)
                            : formatWallet(user.id);
                      })}
                      {user.id === ingameUserId && "(you)"}
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
            : sessionStat?.users?.map((user) => {
                return (
                  <div
                    className="w-[700px] bg-gray-300 border-2 border-gray-500 rounded-sm h-8"
                    key={user.id}
                  >
                    <span className="ml-1">
                      {user.id === ingameUserId && ingameWalletId
                        ? formatWallet(ingameWalletId)
                        : formatWallet(
                            user.walletId ? user.walletId : user.id
                          )}{" "}
                      {user.id === ingameUserId ? "(you)" : ""}
                    </span>
                  </div>
                );
              })}
        </div>
        {ingameWalletId != null &&
        ingameWalletId != "" &&
        !txSuccessful &&
        sessionStat?.users?.every((user) => user.walletId) &&
        sessionStat?.users?.length > 1 ? (
          <button
            className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 "
            onClick={handleUserDeposit}
          >
            Deposit 0.1 Matic
          </button>
        ) : (
          <button
            className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleStartGame()}
            disabled={isButtonDisabled}
          >
            {startBtnText}
          </button>
        )}
        {textVisible && (
          <div className="relative" onClick={handleClickFormattedText}>
            <div
              className={`w-[1000px] mt-5 mb-5 filter text-gray-500 text-xl font-medium ${
                textIsBlurred ? "blur-[3px]" : ""
              }`}
            >
              {formattedText.map((char, index) => (
                <span
                  key={crypto.randomUUID()}
                  style={{ color: textInputStyles[index] }}
                >
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
          onChange={checkEqualHandler}
          onBlur={handleBlurChanger}
          disabled={isGameEnded}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        ></input>
        {ingameWalletId &&
          userStats.every((user) => user.id.startsWith("0x")) &&
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
      </main>
    </>
  );
};

export default GamePage;
