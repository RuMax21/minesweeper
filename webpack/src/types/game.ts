export type CellState = 'closed' | 'opened' | 'flagged';
export interface Cell {
  isMine: boolean;
  state: CellState;
  nearbyMines: number;
}

export type GameStatus = 'playing' | 'win' | 'lose';
