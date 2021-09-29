var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

let posx = Math.random() * canvas.width;
let posy = Math.random() * canvas.height;
let radius = 70;
let velx = 0;
let vely = 0;
let maxVel = 20;
let accel = .5;

let ptPosX = Math.random()*canvas.width;
let ptPosY = Math.random()*canvas.height;

let keyStorage = {
    'up': false,
    'down': false,
    'right': false,
    'left' : false
}

let createBounds = function () {
    if (posx <= 0 + radius) {
        posx = 0 + radius;
    } else if (posx >= 600 - radius) {
        posx = 600 - radius;
    }
    if (posy <= 0 + radius) {
        posy = 0 + radius;
    } else if (posy >= 600 - radius) {
        posy = 600 - radius;
    }
}

let capSpeed = function (maxVel, currVel) {
    if (currVel > maxVel) {
        return maxVel;
    } else if (currVel < -1 * maxVel) {
        return -1 * maxVel;
    } else {
        return currVel;
    }
}

let controlBall = function () {
    document.addEventListener('keydown', function (event) {
        if (event.key === "ArrowUp") {
            keyStorage['up'] = true;
        } else if (event.key === "ArrowDown") {
            keyStorage['down'] = true;
        }
        if (event.key === "ArrowRight") {
            keyStorage['right'] = true;
        } else if (event.key === "ArrowLeft") {
            keyStorage['left'] = true;
        }
    })

    document.addEventListener("keyup", function (event) {
        if (event.key === "ArrowUp") {
            keyStorage['up'] = false;
        } else if (event.key === "ArrowDown") {
            keyStorage['down'] = false;
        }
        if (event.key === "ArrowRight") {
            keyStorage['right'] = false;
        } else if (event.key === "ArrowLeft") {
            keyStorage['left'] = false;
        }
    })

    if (keyStorage['up']) {
        vely -= accel;
        radius += 1;
    } else if (keyStorage ["down"]) {
        vely += accel;
        if (radius > 6) {
            radius -= 1;
        }
    } else {
        vely = 0;
    }

    if (keyStorage['left']) {
        velx -= accel;
        radius += 1;
    } else if (keyStorage ["right"]) {
        velx += accel;
        if (radius > 6) {
            radius -= 1;
        }
    } else {
        velx = 0;
    }

    vely = capSpeed(maxVel, vely);
    velx = capSpeed(maxVel, velx);
}

let rvel = 2;
let ball = function() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    // ctx.strokeStyle = "black"
    let red = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);

    ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, 0.2)`;

    if (radius <= 5) {
        radius = 5;
    }
    ctx.arc(posx, posy, radius, 0,2*Math.PI);
    ctx.stroke();
    controlBall();

    posx += velx;
    posy += vely;


}

let logData = function () {
    console.log("Velocity X: "+ velx);
    console.log("Velocity Y: " + vely);
    console.log("Pos X: " + posx);
    console.log("Pos Y: " + posy);
}

let genPoint = function () {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(ptPosX, ptPosY, 5, 5);
    ctx.fill();
    ctx.stroke();
}



let mainDraw = function () {
    ball();
    createBounds();
    controlBall();
}

let createPoints = function () {
    ptPosX = Math.random()*canvas.width;
    ptPosY = Math.random()*canvas.height;
    genPoint();
}

window.addEventListener("load", loadHandler);
function loadHandler(evt) {
    setInterval(mainDraw, 30);
    // setInterval(createPoints, 5000);
    setInterval(logData, 1000);
}




