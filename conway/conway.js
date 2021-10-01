let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

const dead = 0;
const alive = 1;

class Grid {
    constructor(rows, cols, custom, customTileSet) {
        this.rows = rows;
        this.cols = cols;
        this.cells = [];
        this.neighbors = [];

        if (custom) {
            this.cells = customTileSet;
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
        ctx.fillStyle = 'grey'

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


let grid = new Grid(14, 36, true, tileSet);

let updateDraw = function () {
    grid.checkCells()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    grid.drawGrid()

}

let app = function () {

    grid.drawGrid()
    setInterval(updateDraw, 250)

}

let loadHandler = function (evt) {
    app();

}

window.addEventListener("load", loadHandler)