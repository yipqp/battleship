import Ship from "./ship";

class Gameboard {
  #board = [];

  #shipList = [];

  #invalidMoves = new Set();

  #id;

  constructor(id = "") {
    this.#id = id;

    for (let i = 0; i < 10; i++) {
      this.#board[i] = [];
      for (let j = 0; j < 10; j++) {
        this.#board[i][j] = "e";
      }
    }
  }

  get board() {
    return this.#board;
  }

  get id() {
    return this.#id;
  }

  get shipList() {
    return this.#shipList;
  }

  placeShip(ship, y, x, isHorizontal) {
    if (Gameboard.isOutOfBounds(ship, y, x, isHorizontal)) return false;

    const { length } = ship;

    const shipCoords = [];

    for (let i = 0; i < length; i++) {
      let newY;
      let newX;

      if (isHorizontal) {
        newY = y;
        newX = x + i;
      } else {
        newY = y + i;
        newX = x;
      }

      const coords = [newY, newX];
      shipCoords.push(coords);
    }

    for (let i = 0; i < shipCoords.length; i++) {
      if (this.isOccupied(shipCoords[i])) return false;
    }

    // all coords are valid
    for (let i = 0; i < shipCoords.length; i++) {
      const row = shipCoords[i][0];
      const col = shipCoords[i][1];
      this.#board[row][col] = ship;
    }

    this.markAsOccupied(shipCoords);

    this.#shipList.push(ship);

    return true;
  }

  static isOutOfBounds(ship, y, x, isHorizontal) {
    const { length } = ship;

    if (isHorizontal) {
      return x + length > 10;
    }

    return y + length > 10;
  }

  isOccupied(coords) {
    const y = coords[0];
    const x = coords[1];

    const deltas = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 },
    ];

    for (let i = 0; i < deltas.length; i++) {
      const newY = y + deltas[i].row;
      const newX = x + deltas[i].col;
      const newCoords = [newY, newX];
      if (this.#invalidMoves.has(`${newCoords[0]} - ${newCoords[1]}`))
        return true;
    }

    return false;
  }

  markAsOccupied(coords) {
    for (let i = 0; i < coords.length; i++) {
      this.#invalidMoves.add(`${coords[i][0]} - ${coords[i][1]}`);
    }
  }

  receiveAttack(y, x) {
    let gridItem = this.#board[y][x];
    if (y > 9 || x > 9 || gridItem === "h") return false;
    if (gridItem === "e") {
      gridItem = "h";
    } else {
      // is a ship
      if (gridItem.isSunk()) return false;
      this.#board[y][x].hit();
    }
    return true;
  }

  allSunk() {
    for (let i = 0; i < this.#shipList.length; i++) {
      if (!this.#shipList[i].isSunk()) return false;
    }
    return true;
  }

  randomPlaceAllShips() {
    const availableShips = [
      new Ship(2),
      new Ship(3),
      new Ship(3),
      new Ship(4),
      new Ship(5),
    ];

    let i = 4;
    let randomIsHorizontal;
    const prevMoves = new Set();

    while (i >= 0) {
      let y = Math.floor(Math.random() * 10);
      let x = Math.floor(Math.random() * 10);
      randomIsHorizontal = Math.random() > 0.5;
      while (prevMoves.has(`${y} - ${x}`)) {
        y = Math.floor(Math.random() * 10);
        x = Math.floor(Math.random() * 10);
      }

      if (this.placeShip(availableShips[i], y, x, randomIsHorizontal)) {
        i--;
        prevMoves.add(`${y} - ${x}`);
      }
    }
  }
}

export default Gameboard;
