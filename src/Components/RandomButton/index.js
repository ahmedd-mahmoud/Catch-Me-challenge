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
  setResult,
  highScore,
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (gameState === GameStateEnum.INGAME && timer > 0) {
      setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameState(GameStateEnum.ENDGAME);
    }
  }, [gameState, setGameState, timer, setTimer]);

  const handleStart = () => {
    if (gameState === GameStateEnum.INITIAL) {
      setGameState(GameStateEnum.INGAME);
    } else if (gameState === GameStateEnum.INGAME) {
      setCount((prevCount) => prevCount + 1);
    }
    const container = containerRef.current;
    const button = buttonRef.current;

    const containerWidth = container.offsetWidth - button.offsetWidth;
    const containerHeight = container.offsetHeight - button.offsetHeight;

    const randomLeft =
      Math.random() * containerWidth + 0.5 * button.offsetWidth;
    const randomTop =
      Math.random() * containerHeight + 0.5 * button.offsetHeight;

    setPosition({
      top: randomTop,
      left: randomLeft,
    });
    setResult(() => {
      if (count > highScore) {
        return "New Highscore";
      }
      if (highScore === 0) {
        return "New Highscore";
      } else {
        return "Game Over";
      }
    });
  };

  const buttonStyle = {
    top: position.top,
    left: position.left,
  };

  return (
    <>
      {/* why are you hidding the button when you can just render the wining status box above it as absolute ?*/}
      {gameState !== GameStateEnum.ENDGAME && (
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
