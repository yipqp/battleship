class Gameboard {
  #board = [];

  #shipList = [];

  constructor() {
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

  placeShip(ship, y, x, isHorizontal) {
    const { length } = ship;

    for (let i = 0; i < length; i++) {
      let shipPosition;
      if (isHorizontal) {
        if (x + length > 10) return;
        shipPosition = this.#board[y][x + i];
      } else {
        if (y + length > 10) return;
        shipPosition = this.#board[y + i][x];
      }

      // grid is empty
      if (shipPosition === "e") {
        if (isHorizontal) {
          this.#board[y][x + i] = ship;
        } else {
          this.#board[y + i][x] = ship;
        }
      }
    }

    this.#shipList.push(ship);
  }

  receiveAttack(y, x) {
    let gridItem = this.#board[y][x];
    if (y > 9 || x > 9 || gridItem === "h") return;
    if (gridItem === "e") {
      gridItem = "h";
    } else {
      // is a ship
      if (gridItem.isSunk()) return;
      this.#board[y][x].hit();
    }
  }

  allSunk() {
    for (let i = 0; i < this.#shipList.length; i++) {
      if (!this.#shipList[i].isSunk()) return false;
    }
    return true;
  }
}

export default Gameboard;
