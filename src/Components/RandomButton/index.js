import React, { useEffect, useRef } from "react";
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
  position,
  setPosition,
}) => {
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
    } else if (gameState === GameStateEnum.INGAME) {
      setCount((prevCount) => prevCount + 1);
      if (count === 4) {
        setGameState(GameStateEnum.WON);
      }
    }
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
      {/* why are you hidding the button when you can just render the wining status box above it as absolute ?*/}
      {/* why not at a game state called end game ? review you states carfully */}
      {gameState !== GameStateEnum.WON && gameState !== GameStateEnum.LOST && (
        <button
          ref={buttonRef}
          onClick={handleStart}
          id="random-button"
          style={buttonStyle}
        >
          {gameState === GameStateEnum.INITIAL ? "Start Game" : "Catch Me!"}
        </button>
      )}
    </>
  );
};

export default RandomButton;
