//const grid = new Array(4).fill([0, 0, 0, 0]);
const grid = [  [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]    ];

const ctx = document.querySelector(".gameBoard");

const addNumber = () => {
    let empty = [];
    for (let i = 0; i < 4; ++i){
        for (let j = 0; j < 4; ++j){
            if (grid[i][j] === 0) {
                empty.push([i, j])
            }
        }
    }
    if(empty.length) {
        let spot =  empty[Math.floor(empty.length * Math.random())];
        console.log(spot);        
        grid[spot[0]][spot[1]] = (Math.random() > 0.5) ? 2 : 4;
    } else {
        alert("przegrana");
    }
}

console.log(grid);
addNumber();
addNumber();
//grid[1][2] =4;
console.table(grid);