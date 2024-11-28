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

  test("returnFromSubroutine decrements sp", () => {
    expect(chip8.sp).toBe(0);
    chip8.sp = 1;

    expect(chip8.sp).toBe(1);

    chip8.returnFromSubroutine();

    expect(chip8.sp).toBe(0);
  });

  test("returnFromSubroutine sets pc", () => {
    const address = 5;
    expect(chip8.sp).toBe(0);
    expect(chip8.pc).toBe(0);

    chip8.stack[1] = address;
    chip8.sp = 1;

    chip8.returnFromSubroutine();

    expect(chip8.pc).toBe(address)
  });

  test("jumpToAddress sets pc", () => {
    const address = 5;
    expect(chip8.pc).toBe(0);

    chip8.jumpToAddress(address);

    expect(chip8.pc).toBe(address)
  });

  test("callSubroutine stores current pc on stack", () => {
    const address = 5;
    const oldPc = 4;
    expect(chip8.sp).toBe(0);

    chip8.pc = oldPc;
    expect(chip8.pc).toBe(oldPc);

    chip8.callSubroutine(address);

    expect(chip8.stack[chip8.sp]).toBe(oldPc);
  });

  test("callSubroutine sets pc to address", () => {
    const address = 5;
    const oldPc = 4;
    expect(chip8.sp).toBe(0);

    chip8.pc = oldPc;
    expect(chip8.pc).toBe(oldPc);

    chip8.callSubroutine(address);

    expect(chip8.pc).toBe(address);
  });
});