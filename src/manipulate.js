export const flip = (grid, zero, dir) => {
  const arr = JSON.parse(JSON.stringify(zero));
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
      dir ? (arr[i][j] = grid[j][i]) : (arr[j][i] = grid[i][j]);
    }
  }
  return arr;
};

export const slide = row => {
  let arr = [];
  row.reverse().forEach(x => {
    x === 0 ? arr.push(0) : arr.unshift(x);
  });
  return arr;
};

export const combine = row => {
  row = slide(row);
  for (let i = 0; i < 3; ++i) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      return slide(row);
    }
  }
  return row;
};

export const addNumber = (grid) => {
    let empty = [];
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 4; ++j) {
        if (grid[i][j] === 0) {
          empty.push([i, j]);
        }
      }
    }
    if (empty.length) {
      let spot = empty[Math.floor(empty.length * Math.random())];
      grid[spot[0]][spot[1]] = Math.random() > 0.5 ? 2 : 4;
    }
  };
