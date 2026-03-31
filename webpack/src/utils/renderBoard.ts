import { Cell } from '../types';
import flagIcon from '../assets/flag-triangle-right.svg';
import mineIcon from '../assets/bomb.svg';

export function renderBoard(
  board: Cell[][],
  container: HTMLElement,
  onCellClick: (row: number, col: number) => void,
  onRightClick: (row: number, col: number) => void,
) {
  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${board[0].length}, 32px)`;
  container.style.gridTemplateRows = `repeat(${board.length}, 32px)`;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const cell = board[row][col];
      const button = document.createElement('button');
      button.className = `cell ${cell.state}`;
      button.style.width = '32px';
      button.style.height = '32px';

      if (cell.state === 'opened') {
        if (cell.isMine) {
          const img = document.createElement('img');
          img.src = mineIcon;
          img.style.width = '20px';
          img.style.height = '20px';
          button.appendChild(img);
        } else if (cell.nearbyMines > 0) {
          button.textContent = cell.nearbyMines.toString();
        } else {
          button.textContent = '';
        }
      } else if (cell.state === 'flagged') {
        const img = document.createElement('img');
        img.src = flagIcon;
        img.style.width = '20px';
        img.style.height = '20px';
        button.appendChild(img);
      }

      button.addEventListener('click', () => onCellClick(row, col));
      button.addEventListener('contextmenu', e => {
        e.preventDefault();
        onRightClick(row, col);
      });

      container.appendChild(button);
    }
  }
}
