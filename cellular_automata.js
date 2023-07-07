let rows, cols, cellSize, k;
let grid, grid2;
let flow = new Array(3);
let width = 400,
  height = 400;
function setup() {
  const canvas = createCanvas(width, height);
  canvas.parent("canvas-container");
  cellSize = 7;
  rows = floor(width / cellSize);
  cols = floor(height / cellSize);
  background(0);
  grid = new Array(cols);
  grid2 = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    grid2[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
      grid2[i][j] = 0;
    }
  }
  for (let index = 0; index < 9; index++) {
    flow[index] = new Array(3);

    for (let i = 0; i < 3; i++) {
      flow[index][i] = 0;
    }
  }
  // frameRate(5);
}

function draw() {
  displayGrid();

  if (mouseIsPressed) {
    if (mouseX < width && mouseY < height) {
      mousePressed();
    }
  }
  updategrid();
  //grid = grid2;
}

function displayGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      noStroke();
      if (grid2[x][y] == 1) {
        fill(0);
      } else {
        fill(255);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function mousePressed() {
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  grid2[x][y] = 1;
  // console.log(x, y);
  //grid = grid2;
}

function updategrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let left = (x - 1 + cols) % cols;
      let right = (x + 1) % cols;
      let top = (y - 1 + rows) % rows;
      let bottom = (y + 1) % rows;

      if (grid[x][y] == 1) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            let neighborX = (x + j + cols) % cols;
            let neighborY = (y + i + rows) % rows;

            if (flow[i + 1][j + 1] == 1 || flow[i + 1][j + 1] == 2) {
              grid2[neighborX][neighborY] = flow[i + 1][j + 1];
            }
          }
        }
      }
    }
  }

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y] = grid2[x][y];
    }
  }
}

const myDiv = document.getElementById("display");
let dis = "";
function changeState(button) {
  if (button.classList.contains("on")) {
    let id = button.id;
    let contain = "off";
    findVecotor(id, contain);
    button.classList.remove("on");
    button.classList.add("off");
    button.innerHTML = "Off";
  } else if (button.classList.contains("off")) {
    button.classList.remove("off");
    button.classList.add("ignore");
    button.innerHTML = "Ignore";
    let id = button.id;
    let contain = "ignore";
    findVecotor(id, contain);
  } else {
    button.classList.remove("ignore");
    button.classList.add("on");
    button.innerHTML = "On";
    let id = button.id;
    let contain = "on";
    findVecotor(id, contain);
  }
  let dis = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      dis += flow[i][j] + ", ";
    }
    dis += "<br>";
  }
  myDiv.innerHTML = dis;
}
function toggleProcess() {
  // const button = document.getElementById("toggleButton");
  // if (button.textContent === "Start") {
  //   button.textContent = "Stop";
  //   startProcess();
  // } else {
  //   button.textContent = "Start";
  //   stopProcess();
  // }
}
function findVecotor(id, contain) {
  if (contain == "on") {
    let row = floor((id - 1) / 3);
    let col = (id - 1) % 3; //

    flow[row][col] = 1;
  }
  if (contain == "off") {
    let row = floor((id - 1) / 3);
    let col = (id - 1) % 3; //

    flow[row][col] = 2;
  }
  if (contain == "ignore") {
    let row = floor((id - 1) / 3);
    let col = (id - 1) % 3; //

    flow[row][col] = 0;
  }
}
