import React, { useState, useRef } from 'react';
import Circle from "./assets/blackCircle.png";
import Cross from "./assets/crossImageTic.png";

let data = ["", "", "", "", "", "", "", "", ""];
const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [winner, setWinner] = useState("");
  let [winningLine, setWinningLine] = useState(null);
  let titleRef = useRef(null); // Initialize useRef correctly

  const toggle = (e, num) => {
    if (lock) {
      return;
    }
    if (data[num] !== "") {
      return; // Prevent filling the same spot
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${Cross}'/>`;
      data[num] = "x";
      setCount(count + 1);
    } else {
      e.target.innerHTML = `<img src='${Circle}'/>`;
      data[num] = "o";
      setCount(count + 1);
    }
    CheckWin();
  };

  function CheckWin() {
    const winConditions = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6]  // Diagonal 2
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] === data[b] && data[b] === data[c] && data[a] !== "") {
        setWinner(data[a]);
        setWinningLine(condition);
        setLock(true);
        if (titleRef.current) {
          titleRef.current.innerHTML = `Player ${data[a].toUpperCase()} Wins!`; // Update title with winner
        }
        return;
      }
    }
  }

  function ResetGame() {
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    setLock(false);
    setWinner("");
    setWinningLine(null);
    document.querySelectorAll(".boxes").forEach((box) => box.innerHTML = "");
    if (titleRef.current) {
      titleRef.current.innerHTML = "Tic Tac Toe <span>React</span>"; // Reset title text
    }
  }

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe <span>React</span></h1>
      <div className={`board ${winningLine ? 'won' : ''}`}>
        <div className="row1">
          <div className="boxes" onClick={(e) => { toggle(e, 0); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 1); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 2); }}></div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => { toggle(e, 3); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 4); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 5); }}></div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => { toggle(e, 6); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 7); }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 8); }}></div>
        </div>

        {/* Winning line */}
        {winningLine && <div className={`line win-line-${winningLine.join('')}`}></div>}
      </div>
      <button className="reset" onClick={ResetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
