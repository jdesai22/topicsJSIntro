let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

const dead = 0;
const alive = 1;

function getMouse(evt) {
    let bRect = canvas.getBoundingClientRect();
    let mouseX = (evt.clientX - bRect.left)*(canvas.width/bRect.width);
    let mouseY = (evt.clientY - bRect.top)*(canvas.height/bRect.height);
    return [mouseX, mouseY];
}

//
// function mouseDownHandler(evt) {
//     let mouse = getMouse(evt);
// }

class Grid {
    constructor(rows, cols, custom, customTileSet, drawing) {
        this.rows = rows;
        this.cols = cols;
        this.cells = [];
        this.neighbors = [];

        this.toggleMap = [];

        if (custom) {
            this.cells = customTileSet;
        } else if (drawing) {
            let inter = [];
            let inter2 = [];
            for (let i = 0; i < this.rows; i++) {
                inter = []
                inter2 = []
                for (let j = 0; j < this.cols; j++) {
                    inter.push(0)
                    inter2.push(Date.now())
                }
                this.cells.push(inter)
                this.toggleMap.push(inter2)
            }
        } else {
            let inter = [];
            for (let i = 0; i < this.rows; i++) {
                inter = []
                for (let j = 0; j < this.cols; j++) {
                    if (j === 3) {
                        inter.push(1)
                    } else {
                        inter.push(0)
                    }
                }
                this.cells.push(inter)
            }
        }
    }

    logData() {
        // let inter = []
        // for (let i = 0; i < this.rows; i++) {
        //     inter = []
        //     for (let j = 0; j < this.cols; j++) {
        //         inter.push(this.numberNeighbors(j, i))
        //     }
        //     this.neighbors.push(inter)
        // }
        //
        // console.log(this.neighbors)
    }

    drawGrid() {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black'

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                ctx.beginPath()

                ctx.rect(j * canvas.width/this.cols, i * canvas.height/this.rows, canvas.width/this.cols, canvas.height/this.rows)

                if (this.cells[i][j] === alive) {
                    ctx.fill()
                }
                ctx.stroke();
            }
         }
    }

    numberNeighbors(i, j) {
        let num = 0;

        try {if (this.cells[i-1][j-1]) {num++}} catch (e) {}
        try {if (this.cells[i][j-1]) {num++}} catch (e) {}
        try {if (this.cells[i+1][j-1]) {num++}} catch (e) {}

        try {if (this.cells[i-1][j]) {num++}} catch (e) {}
        try {if (this.cells[i+1][j]) {num++}} catch (e) {}

        try {if (this.cells[i-1][j+1]) {num++}} catch (e) {}
        try {if (this.cells[i][j+1]) {num++}} catch (e) {}
        try {if (this.cells[i+1][j+1]) {num++}} catch (e) {}

        return num;
    }

    checkCells() {
        /*

        if alive:
            rule 1 : if < 2 neighbors, die
            rule 2 : if 2 || 3 neighbors, survive
            rule 3 : if > 3 neighbors, die

        if dead:
            if exactly 3 live neighbors, reproduction

         */
        let nextCells = []
        let inter = [];
        for (let i = 0; i < this.rows; i++) {
            inter = []
            for (let j = 0; j < this.cols; j++) {
                inter.push(0)
            }
            nextCells.push(inter)
        }

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let neighbors = this.numberNeighbors(i, j);

                if (this.cells[i][j]) {
                    if (neighbors < 2 || neighbors > 3) {
                        nextCells[i][j] = 0;
                    } else {
                        nextCells[i][j] = 1;
                    }
                } else {
                    if (neighbors === 3) {
                        nextCells[i][j] = 1;
                    }
                }
            }
        }

        this.cells = nextCells;
    }

    customDraw(evt) {
        let mouse = getMouse(evt);

        let j = Math.floor(this.cols * mouse[0]/canvas.width);
        let i = Math.floor(this.rows * mouse[1]/ canvas.height);


        if (this.cells[i][j] === 1 && Date.now() - this.toggleMap[i][j] > 200) {
            console.log("making dead")
            this.cells[i][j] = 0;
            this.toggleMap[i][j] = Date.now();
        } else if (this.cells[i][j] === 0 && Date.now() - this.toggleMap[i][j] > 200) {
            this.cells[i][j] = 1;
            this.toggleMap[i][j] = Date.now();
        }
    }

}


let tileSet = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

// change 3rd to true, and 5th to false if you want to use glider option
let grid = new Grid(14, 36, false, tileSet, true);

let updateDraw = function () {
    grid.checkCells()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    grid.drawGrid()
}

let drawingGrid = function () {
    canvas.addEventListener("mousedown", function (evt) {
        grid.customDraw(evt)
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    grid.drawGrid()

}

let start = false;
let startType;
let interStep;

let commenceSimulation = function () {
    document.addEventListener('keydown', function (event) {
        if (event.key === " ") {
            // startType = document.getElementById("startType").value;
            // console.log(startType)
            start = true;
        }
    })
}

let finishDrawing = function () {
    document.addEventListener('keydown', function (event) {
        if (event.key === "f") {
            interStep = true;
        }
    })
}


let runOnce = 0;

let masterHandler = function () {
    // if (!start) {
    //     commenceSimulation()
    // } else {
    //     if (runOnce === 0) {
    //         if (startType === "draw") {
    //             grid = new Grid(14, 36, false, tileSet, true);
    //         } else if (startType === "glider") {
    //             grid = new Grid(14, 36, true, tileSet, false);
    //         }
    //         grid.drawGrid()
    //         runOnce+=1;
    //     }
    //
    //     if (startType === "draw") {
    //         if (!interStep) {
    //             document.getElementById("instructions").innerHTML = "Press f to go next."
    //             setInterval(drawingGrid, 5)
    //         } else {
    //             setInterval(updateDraw, 500)
    //         }
    //     } else if (startType === "glider") {
    //         setInterval(updateDraw, 500)
    //     }
    //
    // }

    if (!start) {
        setInterval(drawingGrid, 10)
        commenceSimulation();
    } else {
        setInterval(updateDraw, 500)
    }
}

let app = function () {
    grid.drawGrid();

    setInterval(masterHandler, 500)

    // comment above and uncomment below to have preset glider tile also see line 188
    // setInterval(updateDraw, 500)

}

let loadHandler = function (evt) {
    app();

}

window.addEventListener("load", loadHandler)