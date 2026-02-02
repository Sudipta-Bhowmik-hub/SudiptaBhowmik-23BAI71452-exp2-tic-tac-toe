import React from 'react';
import { Form } from 'react-bootstrap';

function DifficultySelector({ difficulty, setDifficulty }) {
  return (
    <Form.Select
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
      className="mb-3 w-25 mx-auto"
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </Form.Select>
  );
}

export default DifficultySelector;
