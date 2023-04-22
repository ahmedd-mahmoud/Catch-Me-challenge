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
    if (gameState === GameStateEnum.InGame && timer > 0) {
      setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameState(GameStateEnum.Lost);
    }
  }, [gameState, setGameState, timer, setTimer]);

  const handleStart = () => {
    if (gameState === GameStateEnum.Initial) {
      setGameState(GameStateEnum.InGame);
      setButtonText("Catch me!");
    } else if (gameState === GameStateEnum.InGame) {
      if (count === 4) {
        setGameState(GameStateEnum.Won);
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
    setGameState(GameStateEnum.Initial);
    setCount(0);
    setTimer(10);
  };

  return (
    <>
      {gameState !== GameStateEnum.Initial &&
        gameState !== GameStateEnum.InGame && (
          <div className="result">
            <h1 id="result-text">
              {gameState === GameStateEnum.Won ? "You Won!" : "Game Over!"}
            </h1>
            <button className="restart-button" onClick={handleRestart}>
              Restart Game
            </button>
          </div>
        )}

      {gameState !== GameStateEnum.Won && gameState !== GameStateEnum.Lost && (
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
