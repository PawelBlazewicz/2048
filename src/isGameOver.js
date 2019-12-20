export default (grid) => {
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (
          grid[i][j] === grid[i][j + 1] ||
          grid[j][i] === grid[j + 1][i] ||
          grid[i][j] === 0
        ) {
          return false;
        }
        if (grid[i][3] === 0) {
          return false;
        }
      }
    }
    return true;
  };