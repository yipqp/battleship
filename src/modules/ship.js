class Ship {
  #length;

  #numTimesHit;

  constructor(length) {
    this.#length = length;
    this.#numTimesHit = 0;
  }

  get length() {
    return this.#length;
  }

  get numTimesHit() {
    return this.#numTimesHit;
  }

  hit() {
    this.#numTimesHit += 1;
  }

  isSunk() {
    if (this.#numTimesHit === 0) return false;
    return this.#numTimesHit === this.#length;
  }
}

export default Ship;
