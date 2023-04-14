import React, { useEffect, useRef, useState } from "react";
import "./index.css";

const RandomButton = ({ count, setCount, containerRef }) => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [text, setText] = useState("Start Game");
  const [gameState, setGameState] = useState("initial");
  const buttonRef = useRef(null);

  useEffect(() => {
    if (gameState === "in game") {
      const timer = setTimeout(() => {
        setGameState("lost");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const handleClick = () => {
    if (gameState === "initial") {
      setGameState("in game");
      setText("Catch me!");
    } else if (gameState === "in game") {
      if (count === 4) {
        setGameState("won");
      }
    }
    setCount(count + 1);

    const container = containerRef.current;
    const button = buttonRef.current;

    const containerWidth = container.offsetWidth - button.offsetWidth;
    const containerHeight = container.offsetHeight - button.offsetHeight;

    const randomLeft = Math.random() * containerWidth;
    const randomTop = Math.random() * containerHeight;

    setPosition({
      top: randomTop,
      left: randomLeft,
    });
  };

  const buttonStyle = {
    top: position.top,
    left: position.left,
  };

  return (
    <>
      {gameState === "won" && (
        <div className="result-text">
          <h1>You won!</h1>
          <p className="refresh-text">Refresh to try again</p>
        </div>
      )}
      {gameState === "lost" && (
        <div className="result-text">
          <h1>Game over!</h1>
          <p className="refresh-text">Refresh to try again</p>
        </div>
      )}
      {gameState !== "won" && gameState !== "lost" && (
        <button
          ref={buttonRef}
          onClick={handleClick}
          id="random-button"
          style={buttonStyle}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default RandomButton;
