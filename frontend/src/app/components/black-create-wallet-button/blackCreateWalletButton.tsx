import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useConnect } from "wagmi";
import { CoinbaseWalletLogo } from "../coinbase-wallet-logo/coinbaseWalletLogo";

const GRADIENT_BORDER_WIDTH = 2;

const buttonStyles = {
  background: "transparent",
  border: "1px solid transparent",
  boxSizing: "border-box",
  marginRight: "0.75rem",
};

const contentWrapperStyle = {
  position: "relative",
};

function Gradient({ children, style, isAnimationDisabled = false }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const gradientStyle = useMemo(() => {
    const rotate = isAnimating ? "720deg" : "0deg";
    return {
      transform: `rotate(${rotate})`,
      transition: isAnimating
        ? "transform 2s cubic-bezier(0.27, 0, 0.24, 0.99)"
        : "none",
      ...style,
    };
  }, [isAnimating, style]);

  const handleMouseEnter = useCallback(() => {
    if (isAnimationDisabled || isAnimating) return;
    setIsAnimating(true);
  }, [isAnimationDisabled, isAnimating, setIsAnimating]);

  useEffect(() => {
    if (!isAnimating) return;
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [isAnimating]);

  return (
    <div style={contentWrapperStyle} onMouseEnter={handleMouseEnter}>
      <div className="gradient-background" style={gradientStyle} />
      {children}
    </div>
  );
}

export function BlackCreateWalletButton({ height = 40, width = 160 }) {
  const { connectors, connect } = useConnect();

  const minButtonHeight = 40;
  const minButtonWidth = 160;
  const buttonHeight = Math.max(minButtonHeight, height);
  const buttonWidth = Math.max(minButtonWidth, width);
  const gradientDiameter = Math.max(buttonHeight, buttonWidth) + 2;
  const styles = useMemo(
    () => ({
      gradientContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: buttonHeight / 2,
        height: buttonHeight,
        width: buttonWidth,
        boxSizing: "border-box",
        overflow: "hidden",
      },
      gradient: {
        background:
          "conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)",
        position: "absolute",
        top: -buttonHeight * 1.8 - GRADIENT_BORDER_WIDTH,
        left: -GRADIENT_BORDER_WIDTH * 2,
        width: gradientDiameter + 2,
        height: gradientDiameter + 2,
      },
      buttonBody: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        backgroundColor: "#000000",
        height: buttonHeight - GRADIENT_BORDER_WIDTH * 2,
        width: buttonWidth - GRADIENT_BORDER_WIDTH * 2,
        fontFamily: "inherit",
        fontWeight: "500",
        fontSize: 14,
        borderRadius: buttonHeight / 2,
        position: "relative",
        paddingRight: 10,
      },
    }),
    [buttonHeight, buttonWidth, gradientDiameter]
  );

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  return (
    <button style={buttonStyles} onClick={createWallet}>
      <div style={styles.gradientContainer}>
        <Gradient style={styles.gradient}>
          <div style={styles.buttonBody} className="text-white">
            <CoinbaseWalletLogo containerStyles={["pr-2"]} />
            Create Wallet
          </div>
        </Gradient>
      </div>
    </button>
  );
}
