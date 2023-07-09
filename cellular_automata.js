let rows,
  cols,
  cellSize,
  k = 1,
  play = 0;
let grid, grid2, grid3;
let ruleSet = new Array(50);
let gen = new Array(3);
let rule = new Array(3);
let itemlist = [];
let width = 400,
  height = 400;
function setup() {
  const canvas = createCanvas(width, height);
  canvas.parent("canvas-container");
  cellSize = 8;
  rows = floor(width / cellSize);
  cols = floor(height / cellSize);
  background(0);
  grid = new Array(cols);
  grid2 = new Array(cols);
  grid3 = new Array(cols);
  for (let index = 0; index < ruleSet.length; index++) {
    ruleSet[index] = new Array(2);
    for (let index2 = 0; index2 < 2; index2++) {
      ruleSet[index][index2] = new Array(9);
      for (let index3 = 0; index3 < 9; index3++) {
        ruleSet[index][index2][index3] = new Array(9);
        for (let index4 = 0; index4 < 9; index4++) {
          ruleSet[index][index2][index3][index4] = 0;
        }
      }
    }
  }
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    grid2[i] = new Array(rows);
    grid3[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
      grid2[i][j] = 0;
      grid3[i][j] = 0;
    }
  }
  for (let index = 0; index < 9; index++) {
    gen[index] = new Array(3);
    rule[index] = new Array(3);

    for (let i = 0; i < 3; i++) {
      gen[index][i] = 2;
      rule[index][i] = 2;
    }
  }
}

function draw() {
  displayGrid();

  if (mouseIsPressed) {
    if (mouseX < width && mouseY < height) {
      mousePressed();
    }
  }
  if (k == 1 || play == 1) {
    updategrid();
    k = 0;
  }
}

function displayGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      noStroke();
      if (grid[x][y] == 1) {
        fill(0);
      } else if (grid[x][y] == 0) {
        fill(255);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function mousePressed() {
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  grid[x][y] = 1;
  grid2[x][y] = 1;
}

function updategrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      for (let g = 0; g < itemlist.length; g++) {
        let f = itemlist[g];
        let match = true;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let neighborX = (x + j - 1 + cols) % cols;
            let neighborY = (y + i - 1 + rows) % rows;
            if (ruleSet[f][0][i][j] !== 2) {
              if (ruleSet[f][0][i][j] !== grid[neighborX][neighborY]) {
                match = false;
                break;
              }
            }
          }
        }

        if (match) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              let neighborX = (x + j + cols) % cols;
              let neighborY = (y + i + rows) % rows;
              if (
                ruleSet[f][1][i + 1][j + 1] == 1 ||
                ruleSet[f][1][i + 1][j + 1] == 0
              ) {
                grid2[neighborX][neighborY] = ruleSet[f][1][i + 1][j + 1];
              }
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
//if (
//   rule[0][0] == grid[(x - 1 + cols) % cols][(y - 1 + cols) % cols] &&
//   rule[0][1] == grid[(x + cols) % cols][(y - 1 + cols) % cols] &&
//   rule[0][2] == grid[(x + 1 + cols) % cols][(y - 1 + cols) % cols] &&
//   rule[1][0] == grid[(x - 1 + cols) % cols][(y + cols) % cols] &&
//   rule[1][1] == grid[(x + cols) % cols][(y + cols) % cols] &&
//   rule[1][2] == grid[(x + 1 + cols) % cols][(y + cols) % cols] &&
//   rule[2][0] == grid[(x - 1 + cols) % cols][(y + 1 + cols) % cols] &&
//   rule[2][1] == grid[(x + cols) % cols][(y + 1 + cols) % cols] &&
//   rule[2][2] == grid[(x + 1 + cols) % cols][(y + 1 + cols) % cols]
// ) {
//   for (let i = -1; i <= 1; i++) {
//     for (let j = -1; j <= 1; j++) {
//       let neighborX = (x + j + cols) % cols;
//       let neighborY = (y + i + rows) % rows;
//       if (gen[i + 1][j + 1] == 1 || gen[i + 1][j + 1] == 2) {
//         grid2[neighborX][neighborY] = gen[i + 1][j + 1];
//       }
//     }
//   }
// }
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
}
function toggleProcess() {
  const button = document.getElementById("toggleButton");
  if (button.textContent === "Start") {
    button.textContent = "Stop";
    play = 1;
  } else {
    button.textContent = "Start";
    play = 0;
  }
}
function findVecotor(id, contain) {
  if (contain == "on") {
    let row = floor((id - 1) / 3);
    let col = (id - 1) % 3;

    gen[row][col] = 1;
  }
  if (contain == "off") {
    let row = floor((id - 1) / 3);
    let col = (id - 1) % 3;

    gen[row][col] = 0;
  }
  if (contain == "ignore") {
    let row = floor((id - 1) / 3);
    let col = (id - 1) % 3;

    gen[row][col] = 2;
  }
}
function findVecotor2(id, contain) {
  if (contain == "on") {
    let row = floor((id - 1) / 3);
    let col = (id - 1) % 3;

    rule[row][col] = 1;
  }
  if (contain == "off") {
    let row = floor((id - 1) / 3);
    let col = (id - 1) % 3;

    rule[row][col] = 0;
  }
  if (contain == "ignore") {
    let row = floor((id - 1) / 3);
    let col = (id - 1) % 3;

    rule[row][col] = 2;
  }
}
function nextFrame() {
  k = 1;
}

function changeForm(button) {
  if (button.classList.contains("on")) {
    let id = button.id;
    let contain = "off";
    findVecotor2(id, contain);
    button.classList.remove("on");
    button.classList.add("off");
    button.innerHTML = "Off";
  } else if (button.classList.contains("off")) {
    button.classList.remove("off");
    button.classList.add("ignore");
    button.innerHTML = "Ignore";
    let id = button.id;
    let contain = "ignore";
    findVecotor2(id, contain);
  } else {
    button.classList.remove("ignore");
    button.classList.add("on");
    button.innerHTML = "On";
    let id = button.id;
    let contain = "on";
    findVecotor2(id, contain);
  }
}
const addButton = document.getElementById("add-button");
const itemList = document.getElementById("item-list");
const itemContainer = document.getElementById("item-container");

let counter = 1;

function addItemToList() {
  const newItem = createNewItem();
  appendItemToItemList(newItem);
  incrementCounter();
}
function createNewItem() {
  const newItem = document.createElement("li");
  newItem.className = "item";
  newItem.id = counter;
  itemlist.push(counter);
  for (let i = 0; i < 2; i++) {
    if (i == 0) {
      for (let index = 0; index < 9; index++) {
        for (let index2 = 0; index2 < 9; index2++) {
          ruleSet[counter][i][index][index2] = rule[index][index2];
        }
      }
    }
    if (i == 1) {
      for (let index = 0; index < 9; index++) {
        for (let index2 = 0; index2 < 9; index2++) {
          ruleSet[counter][i][index][index2] = gen[index][index2];
        }
      }
    }
  }
  const itemText = createItemText();
  const deleteButton = createDeleteButton();
  deleteButton.addEventListener("click", function () {
    let id = deleteButton.id;
    for (let index = 0; index < itemlist.length; index++) {
      if (itemlist[index] == id) {
        itemlist.splice(index, 1);
        break;
      }
    }
    newItem.remove();
  });

  newItem.appendChild(itemText);
  newItem.appendChild(deleteButton);
  return newItem;
}

function createItemText() {
  const itemText = document.createElement("span");
  itemText.className = "item-text";
  itemText.textContent = counter;
  return itemText;
}

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "button-container";
  deleteButton.id = counter;
  return deleteButton;
}

function appendItemToItemList(item) {
  itemList.appendChild(item);
}

function incrementCounter() {
  counter++;
}

addButton.addEventListener("click", addItemToList);
