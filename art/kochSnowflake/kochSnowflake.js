let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let length = canvas.width - 60;

let snowflake = function (length, depth) {
    if (depth > 0) {
        snowflake(length/3, depth - 1)
        ctx.rotate(Math.PI/3)

        snowflake(length/3, depth - 1)
        ctx.rotate(-2*Math.PI/3)

        snowflake(length/3, depth - 1)
        ctx.rotate(Math.PI/3)

        snowflake(length/3, depth - 1)

    } else {
        ctx.lineTo(length, 0)
        ctx.translate(length, 0)
    }
}

let app = function () {
    ctx.translate(40, canvas.height/2)
    ctx.moveTo(0, 0)
    snowflake(length, 6)
    ctx.stroke();
}

let loadHandler = function (evt) {
    app();

}

window.addEventListener("load", loadHandler)