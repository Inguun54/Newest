const startButton = document.getElementById("startButton");
startButton.onclick = function () {
  startButton.style.display = "none";
  setInterval(ToggleCharacter, 1000);
};

const board = document.getElementById("board");
const scoreElement = document.getElementById("score");
let score = 0;
let occupiedTiles = [];
let isMoleTurn = true;

for (let i = 0; i < 9; i++) {
  let tile = document.createElement("div");
  tile.classList.add("tile");
  tile.id = i.toString();
  board.appendChild(tile);
}

function RandomNumber() {
  return Math.floor(Math.random() * 9).toString();
}

function UpdateScore(amount) {
  score += amount;
  scoreElement.textContent = `Your score: ${score}`;
}

function HideCharacter() {
  occupiedTiles.forEach((tileId) => {
    const box = document.getElementById(tileId);
    box.innerHTML = "";
  });
  occupiedTiles = [];
}

function ShowCharacter(type) {
  HideCharacter();

  let number;
  do {
    number = RandomNumber();
  } while (occupiedTiles.includes(number));

  const box = document.getElementById(number);
  const character = document.createElement("img");

  if (type === "mole") {
    character.src = "image copy.png";
    character.alt = "Mole";
    character.onclick = function () {
      UpdateScore(10);
      HideCharacter();
    };
  } else if (type === "chomper") {
    character.src = "image copy 4.png";
    character.alt = "Chomper";
    character.onclick = function () {
      EndGame();
    };
  }

  character.style.width = "100%";
  character.style.height = "100%";
  character.style.cursor = "pointer";

  box.appendChild(character);
  occupiedTiles.push(number);
}

function EndGame() {
  scoreElement.textContent = `Game Over!!!`;
  setTimeout(() => {
    window.location.reload();
    window.location.href = "index.html";
  }, 3200);
}

function ToggleCharacter() {
  ShowCharacter(isMoleTurn ? "mole" : "chomper");
  isMoleTurn = !isMoleTurn;
}

