import { useRef, useState, useEffect } from "react";
import RandomButton from "./Components/RandomButton";
import { GameStateEnum } from "./Enums/GameStateEnum"; // very good

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
  };

  return (
    <div>
      <div>
        <p id="title">Catch me if you can:</p>
      </div>
      <p id="highscore-text">Highscore: {highScore}</p>
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

        {gameState !== GameStateEnum.INITIAL &&
          gameState !== GameStateEnum.INGAME && (
            <div className="result">
              <h1 id="result-text">
                {highScore < count + 1 ? "New Highscore!" : "Game Over!"}
              </h1>
              <button className="restart-button" onClick={handleRestart}>
                Restart Game
              </button>
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
