import React from 'react';

export default function DifficultySelector({ difficulty, setDifficulty }) {
  return (
    <div>
      <label style={{ marginRight: '10px' }}>Difficulty:</label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}
