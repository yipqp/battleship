import Ship from "../modules/ship";

test("hit() works correctly", () => {
  const testShip = new Ship(3);
  testShip.hit();
  expect(testShip.numTimesHit).toBe(1);
});

test("sink() works correctly", () => {
  const testShip = new Ship(1);
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
