"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import WsApiService, {
  CountDown,
  DriverMetrics,
  RaceStatistic,
} from "@/app/api/ws-api-service";
import { userDeposit } from "@/app/contract-utils/user-deposit";
import { handleCreateNewGameSession } from "@/app/helpers/create-new-game-session";
import { useAccount, useAccountEffect } from "wagmi";

import GamePageHeader from "@/app/components/game-page-header/gamePageHeader";
import CopyButton from "@/app/components/copy-button/copyButton";
import ProgressBar from "@/app/components/progress-bar/progressBar";
import ClaimWinningsButton from "@/app/components/claim-winnings-button/claimWinningsButton";
import StartDepositButton from "@/app/components/start-deposit-button/startDepositButton";

import "./page.css";

const GamePage = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [startBtnText, setStartBtnText] = useState("Start game");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userStats, setUserStats] = useState<DriverMetrics[]>([]);
  const [textIsBlurred, setTextIsBlurred] = useState(false);
  const [textInputStyles, setTextInputStyles] = useState<string[]>([]);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [gameText, setGameText] = useState("");
  const [initialGameText, setInitialGameText] = useState("");
  const [ingameUserId, setIngameUserId] = useState("");
  const [ingameWalletId, setIngameWalletId] = useState("");
  const [txSuccessful, setTxSuccessful] = useState(false);
  const [keyStrokeCount, setKeyStrokeCount] = useState(0);
  const [sessionStat, setSessionStat] = useState<RaceStatistic>({
    id: "",
    users: [],
  });

  const { address } = useAccount();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wsApiServiceRef = useRef<WsApiService | null>(null);
  const formattedText = gameText
    .split("")
    .map((char, index) => <span key={index}>{char}</span>);

  useAccountEffect({
    onConnect(data) {
      setIngameWalletId(data.address);
    },
    onDisconnect() {
      setIngameWalletId("");
    },
  });

  function returnFocusOnClick(e: React.MouseEvent<HTMLDivElement>): void {
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

  function onRacePrepareInfoReceived(stat: RaceStatistic) {
    setSessionStat(stat);
  }

  function onStatisticReceived(stat: RaceStatistic) {
    setUserStats(
      stat.users.map((driverMetrics: DriverMetrics) => ({
        sessionId: driverMetrics.sessionId,
        userId: driverMetrics.userId,
        walletId: driverMetrics.walletId,
        progress: driverMetrics.progress,
        cpm: driverMetrics.cpm,
        place: driverMetrics.place,
        state: driverMetrics.state,
      }))
    );

    if (
      stat.users.find((user) => user.userId === localStorage.getItem("userId"))
        ?.progress === 100
    ) {
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
      if (inputRef.current) {
        inputRef.current.value = "";
      }
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

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
  }, []);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    userIdFromStorage && setIngameUserId(userIdFromStorage);
    if (address) {
      setIngameWalletId(address);
    }

    const sessionId: string = window.location.href.split("/").pop() as string;
    sessionStorage.setItem("sessionId", sessionId);

    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", crypto.randomUUID());
    }

    wsApiServiceRef.current = new WsApiService(
      sessionId,
      localStorage.getItem("userId") ?? "",
      address ?? "",
      onCountDownReceived,
      onStatisticReceived,
      onRacePrepareInfoReceived
    );
  }, [ingameWalletId]);

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
      ingameWalletId ?? ""
    );

    setUserStats([]);
  }

  function checkEqualHandler(e: React.ChangeEvent<HTMLInputElement>) {
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (
      e.key === "Backspace" &&
      inputRef.current &&
      initialGameText.startsWith(inputRef.current.value)
    ) {
      e.preventDefault();
    }
    if (
      e.ctrlKey &&
      e.key === "Backspace" &&
      inputRef.current &&
      initialGameText.startsWith(inputRef.current.value)
    ) {
      console.log("works");
      e.preventDefault();
    }
    if (e.key === "Backspace" && gameText !== initialGameText) {
      setGameText(initialGameText);
    }
  }

  async function handleUserDeposit() {
    const response = await userDeposit();
    if (response && response.status === 1) {
      setTxSuccessful(true);
    }
  }

  return (
    <>
      <GamePageHeader
        ingameWalletId={ingameWalletId}
        isGameEnded={isGameEnded}
        isButtonDisabled={isButtonDisabled}
      />
      <main className="flex flex-col items-center min-[h-screen-h-16] py-2">
        <ProgressBar
          ingameUserId={ingameUserId}
          sessionStat={sessionStat}
          userStats={userStats}
          ingameWalletId={ingameWalletId}
        />
        <StartDepositButton
          ingameWalletId={ingameWalletId}
          txSuccessful={txSuccessful}
          sessionStat={sessionStat}
          handleUserDeposit={handleUserDeposit}
          isButtonDisabled={isButtonDisabled}
          handleStartGame={handleStartGame}
          startBtnText={startBtnText}
        />
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
        <ClaimWinningsButton
          userStats={userStats}
          ingameUserId={ingameUserId}
          ingameWalletId={ingameWalletId}
          txSuccessful={txSuccessful}
        />
        <CopyButton handleCopy={handleCopy} />
      </main>
    </>
  );
};

export default GamePage;
