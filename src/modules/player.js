class Player {
  #possMoves = [];

  #pastMoves = new Set();

  #name;

  constructor(name = "user") {
    this.#name = name;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.#possMoves.push([i, j]);
      }
    }
  }

  get possMoves() {
    return this.#possMoves;
  }

  toString() {
    return this.#name;
  }

  getRandomMove() {
    const max = this.#possMoves.length;
    if (max < 1) return false;
    const rndmIndex = Math.floor(Math.random() * max);
    const rndmMove = this.#possMoves[rndmIndex];
    this.#possMoves.splice(rndmIndex, 1);
    return rndmMove;
  }

  addPastMoves(row, col) {
    this.#pastMoves.add(`${row} - ${col}`);
  }

  isValidMove(row, col) {
    return !this.#pastMoves.has(`${row} - ${col}`);
  }
}

export default Player;
