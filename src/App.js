import { useRef, useState } from "react";
import RandomButton from "./Components/RandomButton";
import { GameStateEnum } from "./Enums/GameStateEnum"; // very good

function App() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(10);
  const [gameState, setGameState] = useState(GameStateEnum.INITIAL);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const containerRef = useRef(null);

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
                {gameState === GameStateEnum.WON ? "You Won!" : "Game Over!"}
              </h1>
              <button className="restart-button" onClick={handleRestart}>
                Restart Game
              </button>
            </div>
          )}
      </div>

      {/* why you tied the score counter with timer ?  */}
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
