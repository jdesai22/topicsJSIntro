let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let length = canvas.width - 60;

let phyllotaxis = function () {
    for (let i = 0; i < canvas.width; i++) {
        ctx.rotate(Math.PI * 137.5/180)
        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.arc(i/2, 0, 2, 0, 2* Math.PI)
        ctx.fill();

    }
}

let app = function () {
    ctx.translate(canvas.width/2, canvas.height/2)
    phyllotaxis()
    ctx.stroke();
}

let loadHandler = function (evt) {
    app();

}

window.addEventListener("load", loadHandler)