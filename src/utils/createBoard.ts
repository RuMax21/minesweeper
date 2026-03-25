import { Cell } from '../types';

export function createBoard(
  rows: number,
  cols: number,
  mines: number,
): Cell[][] {
  const board: Cell[][] = Array(rows)
    .fill(null)
    .map(() =>
      Array(cols)
        .fill(null)
        .map(() => ({
          isMine: false,
          state: 'closed',
          nearbyMines: 0,
        })),
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

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col].isMine) continue;

      let count = 0;
      for (let deltaRow = -1; deltaRow <= 1; deltaRow++) {
        for (let deltaCol = -1; deltaCol <= 1; deltaCol++) {
          const nearbyRow = row + deltaRow;
          const nearbyCol = col + deltaCol;

          if (
            nearbyRow >= 0 &&
            nearbyRow < rows &&
            nearbyCol >= 0 &&
            nearbyCol < cols &&
            board[nearbyRow][nearbyCol].isMine
          ) {
            count++;
          }
        }
      }
      board[row][col].nearbyMines = count;
    }
  }

  return board;
}
