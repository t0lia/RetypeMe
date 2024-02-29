import React, { useState } from "react";

interface ICopyButtonProps {
  handleCopy: () => void;
}

function CopyButton({ handleCopy }: ICopyButtonProps) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    handleCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="absolute left-3 bottom-3 ">
      <button
        className="ml-5 mb-5 bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
        onClick={handleClick}
      >
        {copied ? "Copied!" : "Click to copy game URL"}
      </button>
    </div>
  );
}

export default React.memo(CopyButton);
