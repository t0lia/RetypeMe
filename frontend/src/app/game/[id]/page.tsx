"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";

import { JOIN } from "@/app/api/route";

const DUMMY_TEXT = "lorem ipsum";

const GamePage = () => {
  const [copied, setCopied] = useState(false);
  const [youWon, setYouWon] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  // const [progress, setProgress] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const id = params.id;

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

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = async (id: string) => {
    setTextVisible(true);
    console.log("Starting the game...");
    // sending a request to the server to start the game
    const response = await JOIN(id);
    const data = await response.json();
    console.log(data);
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
        <div className="w-[1000px] bg-slate-400 border-2 border-gray-500  rounded-sm">
          Guest (you)
        </div>
        <div className="w-[1000px] bg-slate-400 border-2 border-gray-500  rounded-sm">
          Guest
        </div>
      </div>
      <button
        className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
        onClick={() => handleStartGame(id as string)}
      >
        Start the game
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
