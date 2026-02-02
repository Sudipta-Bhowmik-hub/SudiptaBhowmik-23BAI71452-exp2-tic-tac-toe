import React, { useState, useEffect } from 'react';
import Square from './Square';
import { Button } from 'react-bootstrap';

function Board({ difficulty, onGameEnd }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false); // ✅ new flag

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  // ✅ Only call onGameEnd once per game
  useEffect(() => {
    if (gameOver) return;

    if (winner) {
      setGameOver(true);
      if (winner === 'X') onGameEnd('win');
      else if (winner === 'O') onGameEnd('loss');
    } else if (isDraw) {
      setGameOver(true);
      onGameEnd('draw');
    }
  }, [winner, isDraw, onGameEnd, gameOver]);

  function handleClick(i) {
    if (squares[i] || winner || gameOver) return;
    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
    setXIsNext(false);

    setTimeout(() => aiMove(newSquares), 500);
  }

  function aiMove(board) {
    if (calculateWinner(board) || board.every(Boolean) || gameOver) return;

    let move;
    if (difficulty === 'easy') {
      const empty = board.map((v, i) => (v ? null : i)).filter(v => v !== null);
      move = empty[Math.floor(Math.random() * empty.length)];
    } else if (difficulty === 'medium') {
      move = findBestMove(board, 'O', 'X');
    } else {
      move = minimaxMove(board, 'O');
    }

    if (move !== undefined) {
      const newSquares = board.slice();
      newSquares[move] = 'O';
      setSquares(newSquares);
      setXIsNext(true);
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false); // ✅ reset flag
  }

  return (
    <div>
      <div className="board">
        {squares.map((val, i) => (
          <Square key={i} value={val} onClick={() => handleClick(i)} />
        ))}
      </div>

      <h3 className="status-text">
        {winner ? `Winner: ${winner}` : isDraw ? 'Draw!' : `Turn: ${xIsNext ? 'X' : 'O'}`}
      </h3>
      <Button variant="secondary" onClick={resetGame}>
        Reset Game
      </Button>
    </div>
  );
}

// --- Helper functions ---
function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function findBestMove(board, ai, player) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    const line = [board[a], board[b], board[c]];
    if (line.filter(v => v === player).length === 2 && line.includes(null)) {
      return [a,b,c].find(i => !board[i]);
    }
  }
  const empty = board.map((v, i) => (v ? null : i)).filter(v => v !== null);
  return empty.length ? empty[Math.floor(Math.random() * empty.length)] : undefined;
}

function minimaxMove(board, ai) {
  const player = 'X';

  function minimax(newBoard, isMaximizing) {
    const winner = calculateWinner(newBoard);
    if (winner === ai) return 1;
    if (winner === player) return -1;
    if (newBoard.every(Boolean)) return 0;

    if (isMaximizing) {
      let best = -Infinity;
      newBoard.forEach((cell, i) => {
        if (!cell) {
          newBoard[i] = ai;
          best = Math.max(best, minimax(newBoard, false));
          newBoard[i] = null;
        }
      });
      return best;
    } else {
      let best = Infinity;
      newBoard.forEach((cell, i) => {
        if (!cell) {
          newBoard[i] = player;
          best = Math.min(best, minimax(newBoard, true));
          newBoard[i] = null;
        }
      });
      return best;
    }
  }

  let bestScore = -Infinity;
  let move;
  board.forEach((cell, i) => {
    if (!cell) {
      board[i] = ai;
      const score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  });
  return move;
}

export default Board;
