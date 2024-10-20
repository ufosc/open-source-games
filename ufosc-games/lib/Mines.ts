
export interface Cell {
    isMine: boolean;
    isRevealed: boolean;
  }
  
  export const createBoard = (rows: number, cols: number, mines: number): Cell[][] => {
    const board: Cell[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isMine: false,
        isRevealed: false,
      }))
    );
  
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!board[row][col].isMine) {
        board[row][col].isMine = true;
        minesPlaced++;
      }
    }
  
    return board;
  };
  