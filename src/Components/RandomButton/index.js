import React, { useState } from "react";
import "./index.css";

const RandomButton = () => {
  const [position, setPosition] = useState({ top: "49%", left: "45%" });

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
  };

  const buttonStyle = {
    position: "absolute",
    top: position.top,
    left: position.left,
  };

  return (
    <button onClick={handleClick} id="random-button" style={buttonStyle}>
      Click me!
    </button>
  );
};

export default RandomButton;
