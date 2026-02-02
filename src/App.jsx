import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DifficultySelector from './components/DifficultySelector.jsx';
import Board from './components/Board.jsx';
import WinnerScorecard from './components/WinnerScorecard.jsx';
import './app.css';

function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [gameResult, setGameResult] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);
  const [gamesDrawn, setGamesDrawn] = useState(0);

  function handleGameEnd(result) {
    setGameResult(result);
    setGamesPlayed(prev => prev + 1);
    if (result === 'win') setGamesWon(prev => prev + 1);
    else if (result === 'loss') setGamesLost(prev => prev + 1);
    else if (result === 'draw') setGamesDrawn(prev => prev + 1);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app-container">
            <h1>Welcome to Smart Tic Tac Toe Game</h1>
            <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
            <Board difficulty={difficulty} onGameEnd={handleGameEnd} />
            <div style={{ marginTop: '1rem' }}>
              <Link to="/scorecard" className="btn-link">View Winner Scorecard</Link>
            </div>
          </div>
        }
      />
      <Route
        path="/scorecard"
        element={
          <div className="app-container">
            <WinnerScorecard
              result={gameResult}
              stats={{ gamesPlayed, gamesWon, gamesLost, gamesDrawn }}
            />
            <div style={{ marginTop: '1rem' }}>
              <Link to="/" className="btn-link blue">Back to Game</Link>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
