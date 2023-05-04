import { useRef, useState, useEffect } from "react";
import RandomButton from "./Components/RandomButton";
import { GameStateEnum } from "./Enums/GameStateEnum"; // very good

let IsReset = false;

function App() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(10);
  const [gameState, setGameState] = useState(GameStateEnum.INITIAL);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") || 0
  );
  const containerRef = useRef(null);

  useEffect(() => {
    if (gameState === GameStateEnum.ENDGAME && highScore < count) {
      localStorage.setItem("highScore", count);
      setHighScore(count);
    }
    // eslint-disable-next-line
  }, [gameState]);
  const handleRestart = () => {
    setPosition({
      top: "50%",
      left: "50%",
    });
    setGameState(GameStateEnum.INITIAL);
    setCount(0);
    setTimer(10);
    IsReset = false;
  };

  const handleResetHighscore = () => {
    localStorage.setItem("highScore", 0);
    setHighScore(0);
    IsReset = true;
  };

  return (
    <div>
      <div id="title-highscore-div">
        <p id="title">Catch me if you can:</p>
        <div id="highscore-div">
          <p id="highscore-text">Highscore: {highScore}</p>
        </div>
      </div>

      <div id="container" ref={containerRef}>
        <RandomButton
          count={count}
          setCount={setCount}
          containerRef={containerRef}
          timer={timer}
          setTimer={setTimer}
          gameState={gameState}
          setGameState={setGameState}
          position={position}
          setPosition={setPosition}
        />
        {gameState === GameStateEnum.ENDGAME && (
          <div className="result">
            <h1 id="result-text">
              {highScore < count + 1 && !IsReset
                ? "New Highscore!"
                : "Game Over!"}
            </h1>
            <div className="result-buttons">
              <button className="restart-button" onClick={handleRestart}>
                Try again
              </button>
              <button id="reset-button" onClick={handleResetHighscore}>
                Reset Highscore
              </button>
            </div>
          </div>
        )}
      </div>

      {gameState !== GameStateEnum.INITIAL && (
        <>
          <p id="score-text">Score: {count}</p>
          <p id="timer">Timer: 00:{timer}</p>
        </>
      )}
    </div>
  );
}

export default App;
