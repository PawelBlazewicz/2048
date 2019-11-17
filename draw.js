//export { draw };
const ctx = document.querySelector(".gameBoard").getContext("2d");

const colors = {
  2: "#fadcba",
  4: "#f0c18c",
  8: "#f0b36f",
  16: "#f09f43",
  32: "#fa9018",
  64: "#f4c023",
  128: "#ffe502",
  256: "#f2f501",
  512: "#ff6c00",
  1024: "#a01c05",
  2048: "#f8170a",
  4096: "#1fff1f"
};

const draw = grid => {
  ctx.beginPath();
  ctx.clearRect(0,0,450,450);
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
      ctx.fillStyle = "rgb(140,140,140)";
      ctx.fillRect(10 + i * 110, 10 + j * 110, 100, 100);
      //Border
      ctx.lineWidth = "2"; 
      ctx.fillStyle = "rgb(0,0,0)"; 
      ctx.rect(10 + i * 110, 10 + j * 110, 100, 100);
      ctx.stroke(); 
      //Border
      let val = grid[i][j];

      if (val !== 0) {
        ctx.fillStyle = colors[val];
        ctx.fillRect(10 + i * 110, 10 + j * 110, 100, 100);
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.font = "" + 50 - (val > 1000 ? 12 : 0) + "px Arial";
        ctx.fillText(
          val,
          45 - (val > 100 ? 15 : 0) - (val > 10 ? 13 : 0) + i * 110,
          75 + j * 110
        );
      }
    }
  }
};