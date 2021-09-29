var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

let posx = Math.random() * canvas.width;
let posy = Math.random() * canvas.height;
let radius = 20;
let velx = 0;
let vely = 0;
let maxVel = 20;
let accel = .5;

let globalScore = 0;

let gameOver = false;


// let maxVel = document.getElementById("maxVel").value;
// let accel = document.getElementById("accel").value;

let firstRun = true;

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
    } else if (keyStorage ["down"]) {
        vely += accel;
    } else {
        vely = 0;
    }

    if (keyStorage['left']) {
        velx -= accel;
    } else if (keyStorage ["right"]) {
        velx += accel;
    } else {
        velx = 0;
    }

    vely = capSpeed(maxVel, vely);
    velx = capSpeed(maxVel, velx);
}


let ball = function() {
    ctx.beginPath();
    ctx.strokeStyle = "black"
    ctx.fillStyle = "black";
    ctx.arc(posx, posy, radius, 0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
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


let lastGen = Date.now();

let genPoint = function (ptPosX, ptPosY) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(ptPosX, ptPosY, 5, 5);
    ctx.fill();
    ctx.stroke();

    lastGen = Date.now();
}

function isInside(circle_x, circle_y, rad, x, y)
{
    if ((x - circle_x) * (x - circle_x) +
        (y - circle_y) * (y - circle_y) <= (rad + 1) * rad)
        return true;
    else
        return false;
}

let point = class {
    constructor() {
        this.x = Math.random()*canvas.width
        this.y = Math.random()*canvas.height
    }
    drawPoint () {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(this.x, this.y, 5, 5);
        ctx.fill();
        ctx.stroke();

    }
    killPoint (posx, posy, radius) {
        if (isInside(posx, posy, radius, this.x, this.y)) {
            globalScore ++
            return true
        } else {
            return false
        }
    }
}

let isPositive = function (num) {
    if (num < 0) {
        return false
    } else {
        return true
    }
}

let obstacle = class  {
    constructor() {
        this.x = Math.random()*canvas.width
        this.y = Math.random()*canvas.height
        this.enemyVelX = Math.random() * 5
        this.enemyVelY = Math.random() * 5
        this.radius = 5
    }
    driver () {
        this.updatePos()
        this.drawObstacle()
        this.resetScore(posx, posy, radius)
        this.createBounds()
    }
    // increaseVelocity () {
    //     if (isPositive(this.enemyVelX)) {
    //         this.enemyVelX ++
    //     } else {
    //         this.enemyVelX --
    //     }
    //     if (isPositive(this.enemyVelY)) {
    //         this.enemyVelY ++
    //     } else {
    //         this.enemyVelY --
    //     }
    // }
    // logData () {
    //     console.log(this.enemyVelX)
    //     console.log(this.enemyVelY)
    // }
    updatePos () {
        // setInterval(this.increaseVelocity, 10)
        // setInterval(this.logData, 1000)
        this.x += this.enemyVelX
        this.y += this.enemyVelY
    }
    drawObstacle () {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        // ctx.stroke();
    }
    resetScore (posx, posy, radius) {
        if (isInside(posx, posy, radius, this.x, this.y)) {
            globalScore = 0
            gameOver = true
            return true
        } else {
            return false
        }
    }
    createBounds () {
        if (this.x <= 0 + this.radius || this.x >= canvas.width - this.radius) {
            this.enemyVelX = - this.enemyVelX;
        }
        if (this.y <= 0 + this.radius || this.y >= canvas.height - this.radius) {
            this.enemyVelY = - this.enemyVelY;
        }
    }
}



let drawScore = function () {
    ctx.font = "30px Arial";
    ctx.strokeText(globalScore, 10, 40)
}

let pt = new point;
// let enemy = new obstacle;

const numObstacles = 10;
let avoid = [];

for (let i = 0; i < numObstacles; i++) {
    let inter = new obstacle;
    avoid.push(inter)
}

let endGame = function () {
    // ctx.clearRect(0, 0, 100, 40)
    ctx.strokeText("game over", 100, 40)
    ctx.strokeText("press space to restart", 100, 100)
    // gameOver = tryAgain()
    tryAgain()
}

let tryAgain = function () {

    document.addEventListener('keydown', function (event) {
        if (event.key === " ") {
            reloadPage();
        }
    })

}

let newGame = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball();
    createBounds();
    controlBall();
    drawScore();

    for (let i = 0; i < numObstacles; i++) {
        avoid[i].driver()
    }

    pt.drawPoint();

    if (pt.killPoint(posx, posy, radius)) {
        pt = new point;
    }
}

// found this reload solutiononline : https://stackoverflow.com/questions/18967532/window-location-reload-not-working-for-firefox-and-chrome
let reloadPage = function () {
    // window.location.href = window.location.href;
    // location.reload();
    // history.go(0);
    document.getElementById("myForm").submit();

    // object.reload(forcedReload);    // setTimeout(function(){
    //     window.location.reload();
    // });
}
let mainDraw = function () {
    if (!gameOver) {
        newGame()
    } else {
        endGame()

    }

    console.log(gameOver)
}

window.addEventListener("load", loadHandler);
function loadHandler(evt) {

    setInterval(mainDraw, 30);
    setInterval(logData, 1000);


}


