"use client";
import React, { useState } from 'react';
import { createBoard, Cell } from '../lib/Mines';

// TypeScript interface for the game state
interface GameState {
  board: Cell[][];
  mines: number;
  gameOver: boolean;
  safeCellsRevealed: number;
}

const MinesGame: React.FC = () => {
  const rows = 5;
  const cols = 5;
  const mineCount = 5;

  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createBoard(rows, cols, mineCount),
    mines: mineCount,
    gameOver: false,
    safeCellsRevealed: 0,
  }));

  const handleCellClick = (row: number, col: number) => {
    if (gameState.gameOver) return;

    const newBoard = [...gameState.board];
    const cell = newBoard[row][col];

    if (cell.isRevealed) return;

    cell.isRevealed = true;

    if (cell.isMine) {
      setGameState({ ...gameState, gameOver: true });
    } else {
      const newSafeCellsRevealed = gameState.safeCellsRevealed + 1;
      const winCondition = rows * cols - mineCount;

      if (newSafeCellsRevealed === winCondition) {
        setGameState({ ...gameState, safeCellsRevealed: newSafeCellsRevealed, gameOver: true });
      } else {
        setGameState({ ...gameState, board: newBoard, safeCellsRevealed: newSafeCellsRevealed });
      }
    }
  };

  return (
    <div>
      {gameState.gameOver && (
        <p>{gameState.safeCellsRevealed === rows * cols - mineCount ? 'You Win!' : 'Game Over'}</p>
      )}
      <div className="board">
        {gameState.board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell.isRevealed ? (cell.isMine ? 'mine' : 'safe') : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell.isRevealed && (cell.isMine ? '💣' : '✓')}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinesGame;
