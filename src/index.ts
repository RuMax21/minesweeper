import { GameStatus } from './types';
import { createBoard, openCell, renderBoard } from './utils';
import './styles.scss';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

let board = createBoard(ROWS, COLS, MINES);
let gameStatus: GameStatus = 'playing';

const container = document.getElementById('board')!;
const startButton = document.getElementById('start-button');

if (startButton) {
  startButton.addEventListener('click', () => {
    board = createBoard(ROWS, COLS, MINES);
    gameStatus = 'playing';
    renderBoard(board, container, handleCellClick, handleRightClick);
  });
}

function handleRightClick(row: number, col: number) {
  const cell = board[row][col];

  if (cell.state === 'opened') return;

  if (cell.state === 'closed') {
    cell.state = 'flagged';
  } else if (cell.state === 'flagged') {
    cell.state = 'closed';
  }

  renderBoard(board, container, handleCellClick, handleRightClick);
}

function handleCellClick(row: number, col: number) {
  if (gameStatus !== 'playing') return;

  const cell = board[row][col];
  if (cell.state === 'opened') return;

  if (cell.isMine) {
    gameStatus = 'lose';
    alert('You lose!');
    return;
  }

  board = openCell(board, row, col);
  renderBoard(board, container, handleCellClick, handleRightClick);

  const allSafeOpened = board.every(row =>
    row.every(cell => cell.isMine || cell.state === 'opened'),
  );

  if (allSafeOpened) {
    gameStatus = 'win';
    alert('You win!');
  }
}

renderBoard(board, container, handleCellClick, handleRightClick);
