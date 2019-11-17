//import {draw} from "./draw.js"
const zero = new Array(4).fill([0, 0, 0, 0]);
let grid = JSON.parse(JSON.stringify(zero));

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
        grid[spot[0]][spot[1]] = (Math.random() > 0.5) ? 2 : 4;
    }
}

const flip = (grid, dir) =>{
    const arr = JSON.parse(JSON.stringify(zero));
    for (let i = 0; i < 4; ++i){
        for (let j = 0; j < 4; ++j){
            dir ? arr[i][j] = grid[j][i] : arr[j][i] = grid[i][j];
        }
    }
    return arr;
}

const slide = (row) => {
    let arr =[];
    row.reverse()
        .forEach(x => { x===0? arr.push(0) : arr.unshift(x) } );
    return arr;    
}

const combine = (row) =>{
    row = slide(row);
    for (let i = 0; i < 3; ++i){
        if( row[i] === row[i+1] ) {
            row[i] *=2 ;
            row[i+1]=0;
            return slide(row);
        }    
    }
    return row;
}

const isGameOver = (grid) => {
    //grid.filter(e => e.some(x => x===0) ).length;
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 3; ++j) {
            if( grid[i][j] === grid[i][j+1] || 
                grid[j][i] === grid[j+1][i] ||
                grid[i][j] === 0) {
                return;
            }
        }
    }
    alert("game over") 
}

const  updateBoard = async (event) => {
    const copy = [...grid];

    switch(event.keyCode) {
        case 37: 
                await flip(grid, 1).map((e, i) =>  {grid[i] = combine(e)});
                grid = flip(grid, 0);
                break;
        case 38: 
                await grid.map((e, i) =>  {grid[i] = combine(e)}); 
                break;
        case 39:
                await flip(grid, 1).map((e, i) =>  {grid[i] = combine(e.reverse()).reverse()});
                grid = flip(grid, 0); 
                break;
        case 40: 
                await grid.map((e, i) =>  {grid[i] = combine(e.reverse()).reverse()}); 
                break;        
    };
     
    draw(grid);
    isGameOver(grid);
    if(copy.join('') !== grid.join('')){
        addNumber();
    } 
    draw(grid)
    console.log(event.timeStamp); 
} 

const startGame =()=> {
    addNumber();
    addNumber();
    draw(grid);
    document.addEventListener('keydown', updateBoard)
}

startGame()