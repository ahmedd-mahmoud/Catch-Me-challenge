import React, { useState } from "react";
import "./index.css";

const RandomButton = () => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [text, setText] = useState("Start");
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const container = document.getElementById("container");
    const button = document.getElementById("random-button");

    const containerWidth = container.clientWidth - button.clientWidth;
    const containerHeight = container.clientHeight - button.clientHeight;

    const randomLeft = Math.random() * containerWidth;
    const randomTop = Math.random() * containerHeight;

    setPosition({
      top: randomTop,
      left: randomLeft,
    });

    if (text === "Start") {
      setText("Click me!");
    }
    setCount(count + 1);
  };

  const buttonStyle = {
    top: position.top,
    left: position.left,
  };

  return (
    <div>
      <p id="title-text">Catch me if you can:</p>
      <p id="counter-text">Counter: {count}</p>
      <div id="container">
        <button onClick={handleClick} id="random-button" style={buttonStyle}>
          {text}
        </button>
      </div>
    </div>
  );
};

export default RandomButton;
