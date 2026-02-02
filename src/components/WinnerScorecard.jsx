import React from 'react';

export default function WinnerScorecard({ result, stats }) {
  let message = '';
  if (result === 'win') message = '🎉 Congratulations! You won!';
  else if (result === 'loss') message = '😔 You lost. Do better next time!';
  else if (result === 'draw') message = '🤝 It\'s a draw!';
  else message = 'Play a game first to see your score!';

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{message}</h2>
      <h3>🏆 Scorecard</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>Games Played: {stats?.gamesPlayed ?? 0}</li>
        <li>Games Won: {stats?.gamesWon ?? 0}</li>
        <li>Games Lost: {stats?.gamesLost ?? 0}</li>
        <li>Games Drawn: {stats?.gamesDrawn ?? 0}</li>
      </ul>
    </div>
  );
}
