import draw from "./src/draw.js";
import { flip, combine, addNumber } from "./src/manipulate.js";
import isGameOver from "./src/isGameOver.js";
const zero = new Array(4).fill([0, 0, 0, 0]);
let grid = JSON.parse(JSON.stringify(zero));

const updateBoard = async event => {
  if (isGameOver(grid)) {
    alert("game over");
    return;
  }
  const copy = [...grid];

  switch (event.keyCode) {
    case 37:
      flip(grid, zero, 1).map((e, i) => {
        grid[i] = combine(e);
      });
      grid = flip(grid, zero, 0);
      break;
    case 38:
      grid.map((e, i) => {
        grid[i] = combine(e);
      });
      break;
    case 39:
      flip(grid, zero, 1).map((e, i) => {
        grid[i] = combine(e.reverse()).reverse();
      });
      grid = flip(grid, zero, 0);
      break;
    case 40:
      grid.map((e, i) => {
        grid[i] = combine(e.reverse()).reverse();
      });
      break;
  }

  if (copy.join("") !== grid.join("")) {
    draw(grid);
    addNumber(grid);
  }
  await new Promise(resolve => setTimeout(resolve, 300));
  draw(grid);
};

(function() {
  addNumber(grid);
  addNumber(grid);
  draw(grid);
  document.addEventListener("keydown", updateBoard);
})();
