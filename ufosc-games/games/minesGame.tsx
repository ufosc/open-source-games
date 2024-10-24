"use client";
import React, { useState } from 'react';
import { createBoard, Cell } from '../components/Mines';
import '../app/globals.css';


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
    <div className="flex justify-center place-content-center content-center">
      <div className="flex justify-center content-center">
        {gameState.gameOver && (
          <p>{gameState.safeCellsRevealed === rows * cols - mineCount ? 'You Win!' : 'Game Over'}</p>
        )}
      </div>
      <div className="grid gap-5 grid-cols-5 place-content-center content-center">
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
