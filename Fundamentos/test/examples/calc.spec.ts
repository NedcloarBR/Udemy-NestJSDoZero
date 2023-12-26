export function add(x: number, y: number) {
  return x + y;
}

describe("Initial test", () => {
  test("add function", () => {
    expect(add(20, 2)).toEqual(22);
  });
});
