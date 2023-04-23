import { useRef, useState } from "react";
import RandomButton from "./Components/RandomButton";
import { GameStateEnum } from "./Enums/GameStateEnum"; // very good

function App() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(10);
  const [gameState, setGameState] = useState(GameStateEnum.INITIAL);
  const containerRef = useRef(null);
  return (
    <div>
      <div>
        <p id="title">Catch me if you can:</p>
      </div>
      {/* you distoried component tree*/}
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

      {/* why you tied the score counter with timer ?  */}
      {gameState !== GameStateEnum.INITIAL && (
        <div>
          <p id="score-text">Score: {count}</p>
          <p id="timer">Timer: 00:{timer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
