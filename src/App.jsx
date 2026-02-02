import React, { useState } from 'react';
import Board from './components/Board';
import DifficultySelector from './components/DifficultySelector';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <Container className="mt-5 text-center">
      <h1>Smart Tic Tac Toe</h1>
      <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
      <Board difficulty={difficulty} />
    </Container>
  );
}

export default App;
