import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const RandomButton = ({ count, setCount, containerRef, timer, setTimer }) => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [text, setText] = useState("Start Game");
  const [gameState, setGameState] = useState("initial");

  const buttonRef = useRef(null);

  useEffect(() => {
    if (gameState === "in game" && timer > 0) {
      setTimeout(() => {
        setTimer((prevtimer) => prevtimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameState("lost");
    }
  }, [gameState, timer, setTimer]);

  const handleClick = () => {
    if (gameState === "initial") {
      setGameState("in game");
      setText("Catch me!");
    } else if (gameState === "in game") {
      if (count === 4) {
        setGameState("won");
      }
    }
    setCount((prevCount) => prevCount + 1);

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

  const handleRestart = () => {
    setPosition({
      top: "50%",
      left: "50%",
    });
    setText("Start Game");
    setGameState("initial");
    setCount(0);
    setTimer(10);
  };

  return (
    <>
      {gameState === "won" && (
        <div className="result-text">
          <h1 id="win-text">You Won!</h1>
          <button className="restart-button" onClick={handleRestart}>
            Restart Game
          </button>
        </div>
      )}
      {gameState === "lost" && (
        <div className="result-text">
          <h1 id="lose-text">Game Over!</h1>
          <button className="restart-button" onClick={handleRestart}>
            Restart Game
          </button>
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
