import { useRef, useState } from "react";
import RandomButton from "./Components/RandomButton";

function App() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(10);
  const containerRef = useRef(null);
  return (
    <div>
      <div>
        <p id="title">Catch me if you can:</p>
        <p id="timer">Timer: 00:{timer}</p>
        <p id="score-text">Score: {count}</p>
      </div>
      <div id="container" ref={containerRef}>
        <RandomButton
          count={count}
          setCount={setCount}
          containerRef={containerRef}
          timer={timer}
          setTimer={setTimer}
        />
      </div>
    </div>
  );
}

export default App;
