import { Cell } from "../types";

export function openCell(board: Cell[][], row: number, col: number): Cell[][] {
  const cell = board[row][col];

  if (cell.state !== 'closed') return board;

  cell.state = 'opened';

  if (cell.isMine) return board;

  if (cell.nearbyMines === 0) {
    for (let deltaRow = -1; deltaRow <= 1; deltaRow++) {
      for (let deltaCol = -1; deltaCol <= 1; deltaCol++) {
        const nearbyRow = row + deltaRow;
        const nearbyCol = col + deltaCol;

        if (nearbyRow >= 0 && nearbyRow < board.length && nearbyCol >= 0 && nearbyCol < board[0].length) {
          if (board[nearbyRow][nearbyCol].state === 'closed' && !board[nearbyRow][nearbyCol].isMine) {
            openCell(board, nearbyRow, nearbyCol);
          }
        }
      }
    }
  }

  return board;
}
