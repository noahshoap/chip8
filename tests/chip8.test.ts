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

    expect(arrayAllZero(chip8.displayBuffer)).toBe(false);

    // Call clear screen
    chip8.clearScreen();

    expect(arrayAllZero(chip8.displayBuffer)).toBe(true);
  });

  test("setPixel sets pixel", () => {
    expect(arrayAllZero(chip8.displayBuffer)).toBe(true);

    chip8.setPixel(0, 0, true);

    expect(chip8.displayBuffer[0]).toBe(1);
  });
});