import Gameboard from "../modules/gameboard";
import Player from "../modules/player";

test("computer random move works", () => {
  const com = new Player();
  const grid = new Gameboard();
  const [y, x] = com.getRandomMove();
  grid.receiveAttack(y, x);
  expect(com.possMoves).not.toContain([y, x]);
});
