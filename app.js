//const grid = new Array(4).fill([0, 0, 0, 0]);
const grid = [  [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]    ];

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
            //ctx.beginPath();
            //ctx.lineWidth = "1";
            //ctx.strokeStyle = "green";
            
            ctx.fillStyle='rgb(140,140,140)';
            ctx.fillRect(10 + i*110, 10 + j*110, 100, 100); 
            ctx.fillStyle='rgb(0,0,0)';                 //Border
            ctx.rect(10 + i*110, 10 + j*110, 100, 100); //Border
            ctx.stroke();                               //Border


            if (grid[i][j] !==0){
                ctx.fillStyle='rgb(250,240,240)';
                ctx.fillRect(10 + i*110, 10 + j*110, 100, 100); 
                ctx.fillStyle='rgb(0,0,0)';
                ctx.font = "50px Georgia";
                ctx.fillText( grid[i][j] ,40 + i*110 , 70 + j*110 );
                
            }
        }
    }
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
    if (event.code === "ArrowUp" ) {
        for (let i = 0; i < 4; ++i){            
            grid[i] = combine(grid[i]);
        }
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