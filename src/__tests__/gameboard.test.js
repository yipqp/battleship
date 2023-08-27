import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

let board;
let ship2;
let ship3;
let ship4;
let ship5;

const makeBoard = () => {
  const boardArray = [];
  for (let i = 0; i < 10; i++) {
    boardArray[i] = [];
    for (let j = 0; j < 10; j++) {
      boardArray[i][j] = "e";
    }
  }
  return boardArray;
};

beforeEach(() => {
  board = new Gameboard();
  ship2 = new Ship(2);
  ship3 = new Ship(3);
  ship4 = new Ship(4);
  ship5 = new Ship(5);
});

describe("ships are placed correctly", () => {
  let pseudoBoard;

  beforeEach(() => {
    pseudoBoard = makeBoard();
  });

  test("all ships in bounds", () => {
    board.placeShip(ship4, 9, 0, false);
    board.placeShip(ship3, 9, 9, false);
    board.placeShip(ship2, 0, 9, true);
    board.placeShip(ship5, 9, 9, true);
    board.placeShip(ship4, 0, 6, true); // valid
    board.placeShip(ship3, 7, 0, true); // valid

    pseudoBoard[0][6] = ship4;
    pseudoBoard[0][7] = ship4;
    pseudoBoard[0][8] = ship4;
    pseudoBoard[0][9] = ship4;

    pseudoBoard[7][0] = ship3;
    pseudoBoard[7][1] = ship3;
    pseudoBoard[7][2] = ship3;

    expect(board.board).toEqual(pseudoBoard);
  });

  test("no adjacent ships", () => {
    board.placeShip(ship2, 0, 0, true); // valid
    board.placeShip(ship3, 1, 0, true);
    board.placeShip(ship3, 2, 0, true); // valid
    board.placeShip(ship4, 0, 2, false);
    board.placeShip(ship4, 0, 4, false); // valid

    pseudoBoard[0][0] = ship2;
    pseudoBoard[0][1] = ship2;

    pseudoBoard[2][0] = ship3;
    pseudoBoard[2][1] = ship3;
    pseudoBoard[2][2] = ship3;

    pseudoBoard[0][4] = ship4;
    pseudoBoard[1][4] = ship4;
    pseudoBoard[2][4] = ship4;
    pseudoBoard[3][4] = ship4;

    expect(board.board).toEqual(pseudoBoard);
  });
});

test("can attack ship", () => {
  board.placeShip(ship3, 3, 3, false);
  board.receiveAttack(3, 4);
  board.receiveAttack(3, 3);
  board.placeShip(ship2, 0, 0, true);
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  expect(ship3.numTimesHit).toBe(1);
  expect(ship2.numTimesHit).toBe(2);
  expect(ship2.isSunk()).toBe(true);
});

test("check win con", () => {
  board.placeShip(ship2, 0, 0, true);
  expect(board.allSunk()).toBe(false);
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  expect(board.allSunk()).toBe(false);
  board.receiveAttack(0, 1);
  expect(board.allSunk()).toBe(true);
});
