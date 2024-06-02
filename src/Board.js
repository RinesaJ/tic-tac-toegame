import React, { useState, useEffect } from 'react';
import Square from './Square';
import './App.css';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [winningLine, setWinningLine] = useState([]);

  useEffect(() => {
    const { winner, line } = calculateWinner(squares);
    if (winner) {
      setWinningLine(line);
      if (winner === 'X') {
        setXWins(xWins => xWins + 1);
      } else if (winner === 'O') {
        setOWins(oWins => oWins + 1);
      }
    }
  }, [squares]);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares).winner) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinningLine([]);
  }

  const { winner } = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="container">
      <div className="status">{status}</div>
      <div className="board">
        {[0, 1, 2].map(row => (
          <div key={row} className="board-row">
            {[0, 1, 2].map(col => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  isWinning={winningLine.includes(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
      {winner && (
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      )}
      <div className="win-counts">
        <p>X Wins: {xWins}</p>
        <p>O Wins: {oWins}</p>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: [] };
}

export default Board;
