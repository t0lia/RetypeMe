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
  const [isDisabled, setIsDisabled] = useState(false);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const id = params.id;
  const apiServiceRef = useRef<WsApiService | null>(null);

  const formattedText = DUMMY_TEXT.split("").map((char, index) => (
    <span key={index}>{char}</span>
  ));

  const realTextFromFormattedText = formattedText
    .map((symb) => symb.props.children)
    .join("");

  let inputText;
  if (typeof document !== "undefined") {
    inputText = document.getElementById("result");
  }

  function onProgressReceived(stat: SessionStat) {
    setProgress((prevProgress) => {
      const newProgress = stat.users[0].progress;
      console.log(stat, newProgress);
      return newProgress;
    });
  }

  function onCountDownReceived(response: CountDown) {
    let count = response.count;
    if (count > 0) {
      setStartBtnText(count.toString());
    }
    if (count <= 0) {
      setStartBtnText("Game started");
      setIsDisabled(true);
      setTextVisible(true);
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
    if (e.target.value !== realTextFromFormattedText) {
      setYouWon(false);
    }

    for (let i = 0; i < e.target.value.length; i++) {
      if (e.target.value[i] !== formattedText[i].props.children) {
        if (inputText) inputText.style.background = "pink";
        text.childNodes[i].style.background = "pink";
      } else {
        if (inputText) {
          if (!apiServiceRef.current) {
            console.error("apiService is not defined");
            return;
          } else {
            const progress = Math.round(((i + 1) / formattedText.length) * 100);
            console.log("Progress:", i, formattedText.length, progress);
            const userId = localStorage.getItem("userId");
            apiServiceRef.current.sendStat(userId, progress);
          }
          inputText.style.background = "white";
          text.childNodes[i].style.background = "lightgreen";
        }
      }
    }

    if (e.target.value === realTextFromFormattedText) {
      setYouWon(true);
      // setRunning(false);
    }
  }

  function clearInput() {
    // setRunning(false);
    setYouWon(false);
    if (inputText) {
      inputText.style.background = "green";
      inputText.value = "";
      text.childNodes.forEach((i) => (i.style.background = "white"));
    }
    console.log("youwon:", youWon);
    // console.log("running:", running);
  }

  useEffect(() => {
    const sessionId: string = window.location.href.split("/").pop() as string;
    apiServiceRef.current = new WsApiService(
      sessionId,
      onCountDownReceived,
      onProgressReceived
    );
  }, []);

  useEffect(() => {
    if (textVisible && inputRef.current) {
      // Delaying the focus operation slightly
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [textVisible]);

  return (
    <div className="flex flex-col items-center  min-h-screen py-2">
      <div className="flex flex-col gap-2 mb-3">
        <p>Progress</p>
        <div
          className="relative bg-gray-300 border-2 border-gray-500 rounded-md h-8 overflow-hidden"
          id="progress"
        >
          <div
            className={`bg-blue-300 h-full`}
            style={{ width: `${progress}%` }}
          ></div>
          <div className="absolute top-0 left-0 bottom-0 right-0 text-white">
            Guest (you)
          </div>
        </div>
        <div className="w-[1000px] bg-slate-400 border-2 border-gray-500  rounded-sm">
          Guest
        </div>
      </div>
      <button
        id="start_btn"
        className={`bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5 ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handleStartGame(id as string)}
        disabled={isDisabled}
      >
        {startBtnText}
      </button>
      {textVisible && (
        <div id="text" className="w-[1000px] mt-5 mb-5">
          {formattedText}
        </div>
      )}
      <input
        ref={inputRef}
        className="opacity-0 cursor-default"
        id="result"
        style={
          youWon
            ? {
                backgroundColor: "lightgreen",
              }
            : { color: "black" }
        }
        // value={!youWon ? "" : null}
        onChange={checkEqualHandler}
        // autoFocus
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

// return (
//   <div className={styles.main}>
//     <Stopwatch startTimer={running} clearText={clearInput} youWon={youWon} />
//     <p id='text'>{formattedText}</p>
//     {cpm && youWon ? (
//       <p>🎉 Your CPM is {cpm} 🎉</p>
//     ) : (
//       <input
//         id='result'
//         style={
//           youWon
//             ? {
//                 backgroundColor: 'lightgreen',
//               }
//             : { color: 'black' }
//         }
//         value={!youWon && !running ? '' : null}
//         onChange={checkEqualHandler}
//         autoFocus
//       ></input>
//     )}
//   </div>
// );
// }
