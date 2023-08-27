import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

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

test("can place ships", () => {
  const boardArray = makeBoard();

  const grid = new Gameboard();
  const ship1 = new Ship(2);

  grid.placeShip(ship1, 0, 3, false);
  boardArray[0][3] = ship1;
  boardArray[1][3] = ship1;

  const ship2 = new Ship(4);
  grid.placeShip(ship2, 3, 2, true);
  boardArray[3][2] = ship2;
  boardArray[3][3] = ship2;
  boardArray[3][4] = ship2;
  boardArray[3][5] = ship2;

  const ship3 = new Ship(2);
  grid.placeShip(ship3, 0, 8, true);
  boardArray[0][8] = ship3;
  boardArray[0][9] = ship3;

  // (ship, x, y, horizontal)
  const ship4 = new Ship(2);
  grid.placeShip(ship4, 9, 0, false);
  grid.placeShip(ship4, 0, 9, true);

  expect(grid.board).toEqual(boardArray);
});

test("can attack ship", () => {
  const grid = new Gameboard();
  const ship = new Ship(4);
  grid.placeShip(ship, 3, 3, false);
  grid.receiveAttack(3, 3);
  const ship2 = new Ship(1);
  grid.placeShip(ship2, 0, 0, true);
  grid.receiveAttack(0, 0);
  grid.receiveAttack(0, 0);
  expect(ship.numTimesHit).toBe(1);
  expect(ship2.numTimesHit).toBe(1);
  expect(ship2.isSunk()).toBe(true);
});

test("check win con", () => {
  const grid = new Gameboard();
  const ship2 = new Ship(1);
  grid.placeShip(ship2, 0, 0, true);
  grid.receiveAttack(0, 0);
  grid.receiveAttack(0, 0);
  expect(grid.allSunk()).toBe(true);

  const grid2 = new Gameboard();
  const ship3 = new Ship(2);
  const ship4 = new Ship(3);
  grid2.placeShip(ship3, 0, 0, true);
  grid2.placeShip(ship4, 5, 5, false);
  expect(grid2.allSunk()).toBe(false);
});
