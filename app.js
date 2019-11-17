import {draw} from "./draw.js"
const zero = new Array(4).fill([0, 0, 0, 0]);
let grid = JSON.parse(JSON.stringify(zero));
//Array.from(zero);
// let grid = [    [2048, 512, 128, 0],
//                 [64, 8, 16, 32],
//                 [2, 4, 1024, 0],
//                 [0, 0, 0, 0]    ];


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
    row = slide(row)
    for (let i = 0; i < 3; ++i){
        if( row[i] === row[i+1] ) {
            row[i] *=2 ;
            row[i+1]=0;
            return slide(row);
            break;
        }    
    }
    return row;
}

const updateBoard =(event)=> {
    console.log(event);
    const copy = [...grid];

    if (event.code === "ArrowUp" ) {
        for (let i = 0; i < 4; ++i){            
            grid[i] = combine(grid[i]);
        }
    }

    if (event.code === "ArrowDown" ) {
        for (let i = 0; i < 4; ++i){           
            grid[i] = combine(grid[i].reverse()).reverse();
        }
    }

    if (event.code === "ArrowLeft" ) {
        grid =flip(grid, 1); 
        for (let i = 0; i < 4; ++i){           
            grid[i] = combine(grid[i]);
        }
        grid = flip(grid, 0);
    }

    if (event.code === "ArrowRight" ) {
        grid =flip(grid, 1); 
        for (let i = 0; i < 4; ++i){                     
            grid[i] = combine(grid[i].reverse()).reverse();
        }
        grid =flip(grid, 0);
    }
    
    if(copy.join('') !== grid.join('')){
        addNumber();
    } 
    draw(grid);
} 

const startGame =()=> {
    addNumber();
    addNumber();
    draw(grid);
    document.addEventListener('keydown', updateBoard)
}

// console.log(grid);
// console.table(grid);
startGame()