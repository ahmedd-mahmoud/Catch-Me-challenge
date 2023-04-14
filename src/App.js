import { useState } from "react";
import RandomButton from "./Components/RandomButton";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <p id="title">Catch me if you can:</p>
        <p id="counter-text">Counter: {count}</p>
      </div>
      <div id="container">
        <RandomButton count={count} setCount={setCount} />
      </div>
    </div>
  );
}

export default App;
