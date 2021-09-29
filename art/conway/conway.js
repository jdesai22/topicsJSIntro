let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let gridSize = [10, 10]


let drawGrid = function (width, height) {
    for (let i = 0; i < width; i += canvas.width/width) {
        for (let j = 0; j < height; j += canvas.height/height) {
            ctx.fillRect(i, j, canvas.width/width, canvas.height/2)
        }
    }
}

let app = function () {
    drawGrid(gridSize[0], gridSize[1])
}

let loadHandler = function (evt) {
    app();

}

window.addEventListener("load", loadHandler)