const zero = new Array(4).fill([0, 0, 0, 0]);
let grid = JSON.parse(JSON.stringify(zero));
//Array.from(zero);

const ctx = document.querySelector(".gameBoard").getContext("2d");

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

const draw = () => {
    //let w = 100;
    for (let i = 0; i < 4; ++i){
        for (let j = 0; j < 4; ++j){
            ctx.fillStyle='rgb(140,140,140)';
            ctx.fillRect(10 + i*110, 10 + j*110, 100, 100); 
            ctx.lineWidth = "2";                        //Border
            ctx.fillStyle='rgb(0,0,0)';                 //Border
            ctx.rect(10 + i*110, 10 + j*110, 100, 100); //Border
            ctx.stroke();                               //Border

            if (grid[i][j] !==0){
                ctx.fillStyle='rgb('+(250 - ((grid[i][j])==64? 100 :0)) +','+(220 - ~~((grid[i][j])/5)) +','+(250 - ((grid[i][j])*32)) +')';
                ctx.fillRect(10 + i*110, 10 + j*110, 100, 100); 
                ctx.fillStyle='rgb(0,0,0)';
                ctx.font = ""+45 - ~~((grid[i][j])/120)+"px Arial";
                ctx.fillText( grid[i][j] ,45 - ((~~(grid[i][j]/100))?10:0) -((~~(grid[i][j]/10))?8:0) + i*110 , 75 + j*110 );
            }
        }
    }
}

const flip = (grid) =>{
    const arr = JSON.parse(JSON.stringify(zero));
    for (let i = 0; i < 4; ++i){
        for (let j = 0; j < 4; ++j){
            arr[i][j] = grid[j][i];
        }
    }
    return arr;
}

const flipBack = (grid) =>{
    const arr = JSON.parse(JSON.stringify(zero));
    for (let i = 0; i < 4; ++i){
        for (let j = 0; j < 4; ++j){
            arr[j][i] = grid[i][j];
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
        grid =flip(grid); 
        for (let i = 0; i < 4; ++i){           
            grid[i] = combine(grid[i]);
        }
        grid = flipBack(grid);
    }

    if (event.code === "ArrowRight" ) {
        grid =flip(grid); 
        for (let i = 0; i < 4; ++i){                     
            grid[i] = combine(grid[i].reverse()).reverse();
        }
        grid =flipBack(grid);
    }
    
    if(copy.join('') !== grid.join('')){
        addNumber();
    } 
    draw();
} 

const startGame =()=> {
    addNumber();
    addNumber();
    draw();
    document.addEventListener('keydown', updateBoard)
}

// console.log(grid);
// console.table(grid);
startGame()