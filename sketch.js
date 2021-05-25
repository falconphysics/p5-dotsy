let dots = [];
let speed = 2;
let nextDir = 0;
let size = 15;
let start = 0;
let screenSize;

function setup() {
  if(windowWidth>windowHeight){
    screenSize = windowHeight;
  }else{
    screenSize = windowWidth;
  }
  createCanvas(screenSize, screenSize);
  size = 15/400*height;
  speed = 2/400*height;
  
  textSize(20/400*height);
  textAlign(CENTER);
  nextDir = int(random(0, 4));
}

function draw() {
  background(50);

  if (start == 0) {
    startScreen();
  } else {
    runGame();
  }
}

class Dots {
  constructor(xPos, yPos, dir) {
    this.x = xPos;
    this.y = yPos;
    this.d = dir;
    this.r = random(75, 255);
    this.g = random(75, 255);
    this.b = random(75, 255);
  }
  drawDot() {
    fill(this.r, this.g, this.b);
    stroke(this.r, this.g, this.b);
    ellipse(this.x, this.y, size, size);
  }
  moveDot() {
    if (this.d == 1) {
      // Right
      this.x = this.x + speed;
      if (this.x > width + size / 2) {
        this.x = -size / 2;
      }
    } else if (this.d == 3) {
      // Left
      this.x = this.x - speed;
      if (this.x < -size / 2) {
        this.x = width + size / 2;
      }
    } else if (this.d == 0) {
      // Up
      this.y = this.y - speed;
      if (this.y < -size / 2) {
        this.y = height + size / 2;
      }
    } else if (this.d == 2) {
      // Down
      this.y = this.y + speed;
      if (this.y > height + size / 2) {
        this.y = -size / 2;
      }
    }
  }
}

function startScreen() {
  fill(200);
  stroke(200);
  text("Tap the screen to place a Ball", width / 2, 100);
  text("The arrow tells you the direction it will move", width / 2, 140);
  text("Don't let them collide", width / 2, 180);
  text("Tap anywhere to start", width / 2, 220);
}

function endScreen() {
  drawScore();
  text("Tap the screen to restart", width / 2, 150);
}

function runGame() {
  background(50);

  for (let i = 0; i < dots.length; i++) {
    dots[i].drawDot();
    dots[i].moveDot();
  }
  drawDir();
  checkEnd();
  drawScore();
}

function drawDir() {
  fill(200);
  stroke(200);

  drawArrow((nextDir * PI) / 2);
}

function drawScore() {
  fill(200);
  stroke(200);
  text("Score = " + dots.length, width / 2, 40);
}

function checkEnd() {
  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots.length; j++) {
      if (i != j) {
        let d = dist(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
        if (d < size) {
          endScreen();
          start = 2;
          noLoop();
        }
      }
    }
  }
}

function mousePressed() {
  if (start == 0) {
    start = 1;
  } else if (start == 2) {
    start = 0;
    restart();
  } else if (mouseX < width - size / 2 && mouseY < height - size / 2) {
    dots.push(new Dots(mouseX, mouseY, nextDir));
    nextDir = int(random(0, 4));
    if (dots.length % 4 == 0) {
      speed += 0.3;
    }
  }
}

function drawArrow(ang) {
  let scale = width/400*1.25;
  
  push();
  translate(width - 30*scale, height - 30*scale);
  rotate(ang);
  rect(-2*scale, -10*scale, 4*scale, 20*scale);
  triangle(-7*scale, -10*scale, 7*scale, -10*scale, 0, -18*scale);
  pop();
}

function restart() {
  dots.splice(0, dots.length);
  nextDir = int(random(0, 4));
  start = 0;
  score = 0;
  loop();
}

function touchEnded() {
  return false;
}
