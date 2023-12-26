"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { JOIN } from "@/app/api/route";
import WsApiService, { CountDown, SessionStat } from "@/app/api/WsApiService";

const DUMMY_TEXT = "loremipsum";

const GamePage = () => {
  const [copied, setCopied] = useState(false);
  const [youWon, setYouWon] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [startBtnText, setStartBtnText] = useState("Start the game");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [textIsBlurred, setTextIsBlurred] = useState(false);
  const [textInputStyles, setTextInputStyles] = useState<Array<string>>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const id = params.id;
  const apiServiceRef = useRef<WsApiService | null>(null);

  const formattedText = DUMMY_TEXT.split("").map((char, index) => (
    <span key={index}>{char}</span>
  ));

  function handleClickFormattedText() {
    inputRef.current?.focus();
    setTextIsBlurred(false);
  }

  function handleBlurChanger() {
    setTextIsBlurred(true);
  }

  function onProgressReceived(stat: SessionStat) {
    const newProgress = stat.users.find((user) => user.id === localStorage.getItem("userId"))?.progress;
    console.log("Progress received:");
    stat.users.forEach((user) => {console.log(user.id, user.progress)});
    setProgress(newProgress ? newProgress : 0);
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
    console.log("Starting the game...");
    // sending a request to the server to start the game
    const response = await JOIN(id);
    const data = await response.json();
    localStorage.setItem("userId", data.userId);
  };

  function checkEqualHandler(e) {
    // setRunning(true);
    if (e.target.value !== DUMMY_TEXT) {
      setYouWon(false);
    }

    const length = e.target.value.length;
    const newTextStyles = Array.from({ length }, (_, i) => "black");

    for (let i = 0; i < length; i++) {
      if (e.target.value[i] !== formattedText[i].props.children) {
        newTextStyles[i] = "orangered";
      }
    }

    setTextInputStyles(newTextStyles);

    if (!apiServiceRef.current) {
      console.error("apiService is not defined");
      return;
    } else {
      const progress = Math.round((length / formattedText.length) * 100);
      console.log("Progress:", progress, formattedText.length, progress);
      const userId = localStorage.getItem("userId");
      apiServiceRef.current.sendStat(userId, progress);
    }

    if (e.target.value === DUMMY_TEXT) {
      setYouWon(true);
      // setRunning(false);
    }
  }

  // function clearInput() {
  //   // setRunning(false);
  //   setYouWon(false);
  //   if (inputTextEl) {
  //     inputTextEl.style.background = "green";
  //     inputTextEl.value = "";
  //     text.childNodes.forEach((i) => (i.style.background = "white"));
  //   }
  //   console.log("youwon:", youWon);
  //   // console.log("running:", running);
  // }

  useEffect(() => {
    const sessionId: string = window.location.href.split("/").pop() as string;
    apiServiceRef.current = new WsApiService(
      sessionId,
      onCountDownReceived,
      onProgressReceived
    );
  }, []);

  return (
    <div className="flex flex-col items-center  min-h-screen py-2">
      <div className="flex flex-col gap-2 mb-3">
        <p>Progress</p>
        <div
          className="relative bg-gray-300 border-2 border-gray-500 rounded-sm h-8 overflow-hidden"
          id="progress"
        >
          <div
            className={`bg-blue-300 h-full`}
            style={{ width: `${progress}%` }}
          ></div>
          <div className="absolute top-0 left-0 bottom-0 right-0 ">
            Guest (you)
          </div>
        </div>
        <div className="w-[1000px] bg-gray-300 border-2 border-gray-500 rounded-sm h-8">
          Guest
        </div>
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
        <div
          id="text"
          className={`w-[1000px] mt-5 mb-5 filter text-gray-500 text-xl font-medium ${
            textIsBlurred ? "blur-[2px]" : ""
          }`}
          onClick={handleClickFormattedText}
        >
          {formattedText.map((char, index) => (
            <span key={index} style={{ color: textInputStyles[index] }}>
              {char}
            </span>
          ))}
        </div>
      )}
      <input
        ref={inputRef}
        className="opacity-0 cursor-default"
        id="result"
        // value={!youWon ? "" : null}
        onChange={checkEqualHandler}
        onBlur={handleBlurChanger}
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
