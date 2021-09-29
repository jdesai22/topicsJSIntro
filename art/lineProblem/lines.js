let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let loadHandler = function (evt) {
    app();

}

let app = function () {
    drawLines(0, 0, canvas.width, canvas.height, 0, canvas.height);
}

let drawLines = function (startx, starty, endx, endy, vertexx, vertexy) {

    for (let i = starty; i <= vertexy; i++) {

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(i, canvas.height);
        let red = Math.floor(Math.random()*255);
        let green = Math.floor(Math.random()*255);
        let blue = Math.floor(Math.random()*255);
        ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, .3)`;
        ctx.stroke();
    }
}

window.addEventListener("load", loadHandler)