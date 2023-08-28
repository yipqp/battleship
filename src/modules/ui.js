import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";

const user = new Player("player");
const comp = new Player("computer");
const userBoard = new Gameboard("user-board");
const compBoard = new Gameboard("comp-board");

const endMsg = document.querySelector(".end-msg");
const userBoardContainer = document.querySelector("#user-board");
const compBoardContainer = document.querySelector("#comp-board");
compBoard.randomPlaceAllShips();
userBoard.randomPlaceAllShips();

let userTurn = true;
let gameOver = false;
let winner;

function displayWin() {
  endMsg.textContent = `${winner} won!`;
  userBoardContainer.style.filter = "opacity(0.7)";
  compBoardContainer.style.filter = "opacity(0.7)";
}

function checkGameEnd() {
  if (compBoard.allSunk()) {
    winner = user;
  } else if (userBoard.allSunk()) {
    winner = comp;
  } else {
    return false;
  }
  gameOver = true;
  displayWin();
  return true;
}

function renderClick(board, row, col) {
  const cellIn2dArr = board.board[row][col];
  const outcome = cellIn2dArr instanceof Ship ? "hitShip" : "hitEmpty";
  const cell = document.querySelector(
    `#${board.id} [data-row="${row}"][data-col="${col}"]`,
  );
  cell.classList.add(outcome);
}

function renderShips(board) {
  for (let i = 0; i < board.board.length; i++) {
    for (let j = 0; j < board.board[i].length; j++) {
      if (board.board[i][j] instanceof Ship) {
        const cell = document.querySelector(
          `#${board.id} [data-row="${i}"][data-col="${j}"]`,
        );
        cell.classList.toggle("ship");
      }
    }
  }
}

function makeCompMove() {
  if (!gameOver && !userTurn) {
    const [row, col] = comp.getRandomMove();
    userBoard.receiveAttack(row, col);
    renderClick(userBoard, row, col);
    checkGameEnd();
    userTurn = true;
  }
}

compBoardContainer.addEventListener("click", (e) => {
  if (!gameOver && userTurn) {
    const cell = e.target;
    if (!cell.classList.contains("cell")) return;
    const { row, col } = cell.dataset;

    if (!user.isValidMove(row, col)) return;

    compBoard.receiveAttack(row, col);
    user.addPastMoves(row, col);
    renderClick(compBoard, row, col);
    userTurn = false;
    checkGameEnd();
    makeCompMove();
  }
});

function startGame() {
  userTurn = true;
  gameOver = false;

  endMsg.textContent = "";

  renderShips(userBoard);
}

startGame();
