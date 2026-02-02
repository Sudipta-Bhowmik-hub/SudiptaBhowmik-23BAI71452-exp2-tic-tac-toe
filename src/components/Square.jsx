import React from 'react';
import { Button } from 'react-bootstrap';

function Square({ value, onClick }) {
  return (
    <Button
      variant="outline-dark"
      className="m-1"
      style={{ width: '80px', height: '80px', fontSize: '24px' }}
      onClick={onClick}
    >
      {value}
    </Button>
  );
}

export default Square;
