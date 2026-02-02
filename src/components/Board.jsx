import React, { useState } from 'react';
import Square from './Square';
import { Button } from 'react-bootstrap';

function Board({ difficulty }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
    setXIsNext(false);

    // Let AI move after a short delay
    setTimeout(() => aiMove(newSquares), 500);
  }

  function aiMove(board) {
    const currentWinner = calculateWinner(board);
    if (currentWinner) return; // stop if game already won

    let move;

    if (difficulty === 'easy') {
      // random move
      const empty = board.map((v, i) => (v ? null : i)).filter((v) => v !== null);
      move = empty[Math.floor(Math.random() * empty.length)];
    } else if (difficulty === 'medium') {
      // block player if needed, else random
      move = findBestMove(board, 'O', 'X');
    } else {
      // hard: minimax
      move = minimaxMove(board, 'O');
    }

    // fallback if move is undefined
    if (move === undefined) {
      const empty = board.map((v, i) => (v ? null : i)).filter((v) => v !== null);
      move = empty.length ? empty[Math.floor(Math.random() * empty.length)] : undefined;
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
  }

  const winner = calculateWinner(squares);

  return (
    <div>
      {/* Render 3 rows of 3 squares */}
      <div className="d-flex justify-content-center">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="d-flex justify-content-center">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="d-flex justify-content-center">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>

      <h3 className="mt-3">
        {winner ? `Winner: ${winner}` : squares.every(Boolean) ? 'Draw!' : `Turn: ${xIsNext ? 'X' : 'O'}`}
      </h3>
      <Button variant="secondary" className="mt-3" onClick={resetGame}>
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
  // fallback random
  const empty = board.map((v, i) => (v ? null : i)).filter((v) => v !== null);
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
