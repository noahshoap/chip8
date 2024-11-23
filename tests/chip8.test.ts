import { Chip8 } from "../src/chip8";
import { IDisplay } from "../src/IDisplay";

function arrayAllZero(arr: Array<number>)
{
  return arr.every(num => num === 0);
}

describe("Chip8 Tests", () => {
  let chip8: Chip8;
  let mockDisplay: jest.Mocked<IDisplay>;

  beforeEach(() => {
    mockDisplay = {};
    chip8 = new Chip8(mockDisplay);
  });

  test("Clear screen clears screen", () => {
    // Fill display buffer with 1s
    chip8.displayBuffer.fill(1);

    // Call clear screen
    chip8.clearScreen();

    expect(arrayAllZero(chip8.displayBuffer)).toBe(true);
  });
});