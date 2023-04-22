import { useRef, useState } from "react";
import RandomButton from "./Components/RandomButton";
import { GameStateEnum } from "./Enums/GameStateEnum";

function App() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(10);
  const [gameState, setGameState] = useState(GameStateEnum.Initial);
  const containerRef = useRef(null);
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
        />
      </div>

      {gameState !== GameStateEnum.Initial && (
        <div>
          <p id="score-text">Score: {count}</p>
          <p id="timer">Timer: 00:{timer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
