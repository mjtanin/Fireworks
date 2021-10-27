const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight - 20;
canvas.width = innerWidth - 20;

addEventListener('resize', () => {
    canvas.height = innerHeight - 20;
    canvas.width = innerWidth - 20;

});

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const gravity = 0.005;
const firction = 0.99;

let showTime =  1000;
setInterval(() => {
    const randomX = Math.floor(Math.random() * innerWidth);
    const randomY = Math.floor(Math.random() * innerHeight);
    const second = Math.random() * 3;
    showTime = second * Math.random() * 1000;
    ballsBlast({clientX: randomX, clientY: randomY})
}, showTime)

class Balls {
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.velocity = velocity;
        this.alpha = 1;
    
        
    }
    draw = function() {
        c.save()
        c.globalAlpha = this.alpha;
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore()
    }

    update = function() {
        this.draw();
        this.velocity.x *= firction;
        this.velocity.y *= firction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
    }

}

function randomColor(){
    const r = Math.floor((Math.random() * 256));
    const g = Math.floor((Math.random() * 256));
    const b = Math.floor((Math.random() * 256));
    const a = 1 //(Math.round(Math.random() * 100)) / 100;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}


let balls = []
addEventListener('click', ballsBlast)

function ballsBlast(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const radius = 5;
    const power = Math.random() * 15 + 7;

    const ballCount = 400;
    const angleIncrement = (Math.PI * 2) / ballCount;



    for (let i = 0; i < ballCount; i++) {
        const circle = new Balls(mouse.x, mouse.y, radius, randomColor(), {
            x: Math.cos(angleIncrement * i) * Math.random() * power, 
            y: Math.sin(angleIncrement * i) * Math.random() * power
        })
        balls.push(circle);
    }

}

function animate() {
    requestAnimationFrame(animate);
    // c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = 'rgba(0, 0, 0, 0.05)'
    c.fillRect(0, 0, innerWidth, innerHeight);

    balls.forEach((ball, i) => {
        if(ball.alpha > 0){
            ball.update()
        }else{
            balls.splice(i, 1)
        }
    })

}

animate()
