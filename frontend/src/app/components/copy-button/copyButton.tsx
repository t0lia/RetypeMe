import React, { useState } from "react";
import { Button } from "../ui/button";

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
      <Button onClick={handleClick}>
        {copied ? "Copied!" : "Click to copy game URL"}
      </Button>
    </div>
  );
}

export default React.memo(CopyButton);
