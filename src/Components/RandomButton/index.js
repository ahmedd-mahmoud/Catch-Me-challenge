import React, { useEffect, useRef, useState } from "react";
import { GameStateEnum } from "../../Enums/GameStateEnum";
import "./styles.css";

const RandomButton = ({
  count,
  setCount,
  containerRef,
  timer,
  setTimer,
  gameState,
  setGameState,
}) => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [buttonText, setButtonText] = useState("Start Game");

  const buttonRef = useRef(null);

  useEffect(() => {
    if (gameState === GameStateEnum.INGAME && timer > 0) {
      setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameState(GameStateEnum.LOST);
    }
  }, [gameState, setGameState, timer, setTimer]);

  const handleStart = () => {
    if (gameState === GameStateEnum.INITIAL) {
      setGameState(GameStateEnum.INGAME);
      setButtonText("Catch me!");
    } else if (gameState === GameStateEnum.INGAME) {
      if (count === 4) {
        setGameState(GameStateEnum.WON);
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
    setButtonText("Start Game");
    setGameState(GameStateEnum.INITIAL);
    setCount(0);
    setTimer(10);
  };

  return (
    <>
      {gameState !== GameStateEnum.INITIAL &&
        gameState !== GameStateEnum.INGAME && (
          <div className="result">
            <h1 id="result-text">
              {gameState === GameStateEnum.WON ? "You Won!" : "Game Over!"}
            </h1>
            <button className="restart-button" onClick={handleRestart}>
              Restart Game
            </button>
          </div>
        )}

      {/* why are you hidding the box when you can just render the wining status box above it as absolute ?*/}
      {/* why not at a game state called end game ? review you states carfully */}
      {gameState !== GameStateEnum.WON && gameState !== GameStateEnum.LOST && (
        <button
          ref={buttonRef}
          onClick={handleStart}
          id="random-button"
          style={buttonStyle}
        >
          {buttonText}
        </button>
      )}
    </>
  );
};

export default RandomButton;
