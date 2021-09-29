let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let loadHandler = function (evt) {
    app();

}



let app = function () {
    // drawObstacle(obstacle.x, obstacle.y, obstacle.r);
    drawLines();
}

let drawLines = function () {
    let lineNum = 200;
    let circleNum = 40;

    // // Creates Initial Board
    for (let i = 0; i <= canvas.width; i+= canvas.width/lineNum) {
        for (let s = 0; s <= canvas.height; s+= canvas.height/lineNum) {
            ctx.fillStyle = `grey`;
            ctx.fillRect(i, s, 2, 2)
        }
    }

    // Fills Circles
    for (let c = 0; c < circleNum; c++) {
        let obstacle = {
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: 50
        }
        let red = Math.floor(Math.random()*255);
        let green = Math.floor(Math.random()*255);
        let blue = Math.floor(Math.random()*255);
        for (let i = 0; i <= canvas.width; i+= canvas.width/lineNum) {
            for (let s = 0; s <= canvas.height; s+= canvas.height/lineNum) {
                if (isInside(obstacle.x, obstacle.y, obstacle.r, i, s)) {
                    ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
                    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
                    ctx.fillRect(i, s+3, 2, 2)
                }
            }
        }
    }


}

function isInside(circle_x, circle_y, rad, x, y)
{
    if ((x - circle_x) * (x - circle_x) +
        (y - circle_y) * (y - circle_y) <= rad * rad)
        return true;
    else
        return false;
}


let drawObstacle = function (x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI)
    ctx.stroke();
}

window.addEventListener("load", loadHandler)