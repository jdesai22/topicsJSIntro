let canvas = document.getElementById("canvas");
console.log(canvas.width);
let ctx = canvas.getContext("2d");
let wt = .95;
window.addEventListener("load", loadHandler);
function loadHandler(evt) {
    app();
}
let app = function () {

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    for (let i = 0; i < canvas.width + 19; i +=19) {
        if (i % 2 === 0) {
            drawThing(i, 0, i, canvas.height, 1, 10)
        } else {
            drawThing2(i, -canvas.height/4, i, 3*canvas.height/4, 1,10)
            drawThing3(i, 3*canvas.height/4, i, 7*canvas.height/4, 1,10)
        }
    }
}

let drawThing = function (x0, y0, x1, y1, minRad, maxRad) {
    let numCircles = 2000;
    for (let i = 0; i < numCircles; i++) {
        let t = i/(numCircles - 1);
        let red = Math.floor(Math.random()*255);
        let green = Math.floor(Math.random()*255);
        let blue = Math.floor(Math.random()*255);
        // ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + ",0.5)";
        let weight = i/(numCircles)
        ctx.strokeStyle = `rgba(${red}, ${green}, ${red}, ${wt})`;
        let x = x0 + t*(x1 - x0);
        let y = y0 + t*(y1 - y0);
        let rad = minRad + (0.5 - 0.5*Math.cos(4*Math.PI*t))*(maxRad - minRad);
        // ctx.fillRect(x, y, 100, 100);
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, 2*Math.PI, true);
        // ctx.closePath();
        ctx.stroke();
    }
}

let drawThing2 = function (x0, y0, x1, y1, minRad, maxRad) {
    let numCircles = 2000;
    for (let i = 0; i < numCircles; i++) {
        let t = i/(numCircles - 1);
        let red = Math.floor(Math.random()*255);
        let green = Math.floor(Math.random()*255);
        let blue = Math.floor(Math.random()*255);
        // ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + ",0.5)";
        let weight = i/(numCircles)
        ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${wt})`;
        let x = x0 + t*(x1 - x0);
        let y = y0 + t*(y1 - y0);
        let rad = minRad + (0.5 - 0.5*Math.cos(4*Math.PI*t))*(maxRad - minRad);
        // ctx.fillRect(x, y, 100, 100);
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, 2*Math.PI, true);
        // ctx.closePath();
        ctx.stroke();
    }
}

let drawThing3 = function (x0, y0, x1, y1, minRad, maxRad) {
    let numCircles = 2000;
    for (let i = 0; i < numCircles; i++) {
        let t = i/(numCircles - 1);
        let red = Math.floor(Math.random()*255);
        let green = Math.floor(Math.random()*255);
        let blue = Math.floor(Math.random()*255);
        // ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + ",0.5)";
        let weight = i/(numCircles)
        ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${wt})`;
        let x = x0 + t*(x1 - x0);
        let y = y0 + t*(y1 - y0);
        let rad = minRad + (0.5 - 0.5*Math.cos(4*Math.PI*t))*(maxRad - minRad);
        // ctx.fillRect(x, y, 100, 100);
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, 2*Math.PI, true);
        // ctx.closePath();
        ctx.stroke();
    }
}