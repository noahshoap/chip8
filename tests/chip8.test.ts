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

  test("skipIfEqual sets pc to expected value if equal", () => {
    const register = 0;
    const number = 5;
    const startPc = 0;
    chip8.vRegisters[register] = number;

    expect(chip8.vRegisters[register]).toBe(number);
    expect(chip8.pc).toBe(startPc);

    chip8.skipIfEqual(register, number);

    expect(chip8.pc).toBe(startPc + 2);
  });

  test("skipIfEqual doesn't change pc if not equal", () => {
    const register = 0;
    const number = 5;
    const startPc = 0;
    chip8.vRegisters[register] = number;

    expect(chip8.vRegisters[register]).toBe(number);
    expect(chip8.pc).toBe(startPc);

    chip8.skipIfEqual(register, 0);

    expect(chip8.pc).toBe(startPc);
  });

  test("skipIfNotEqual sets pc to expected value if not equal", () => {
    const register = 0;
    const number = 5;
    const startPc = 0;
    chip8.vRegisters[register] = number;

    expect(chip8.vRegisters[register]).toBe(number);
    expect(chip8.pc).toBe(startPc);

    chip8.skipIfNotEqual(register, 0);

    expect(chip8.pc).toBe(startPc + 2);
  });

  test("skipIfNotEqual doesn't change pc if equal", () => {
    const register = 0;
    const number = 5;
    const startPc = 0;
    chip8.vRegisters[register] = number;

    expect(chip8.vRegisters[register]).toBe(number);
    expect(chip8.pc).toBe(startPc);

    chip8.skipIfNotEqual(register, number);

    expect(chip8.pc).toBe(startPc);
  });

  test("skipIfRegistersEqual sets pc to expected value if equal", () => {
    const register1 = 0;
    const register2 = 1;
    const number = 5;
    const startPc = 0;
    chip8.vRegisters[register1] = number;
    chip8.vRegisters[register2] = number;

    expect(chip8.vRegisters[register1]).toBe(number);
    expect(chip8.vRegisters[register2]).toBe(number);
    expect(chip8.pc).toBe(startPc);

    chip8.skipIfRegistersEqual(register1, register2);

    expect(chip8.pc).toBe(startPc + 2);
  });

  test("skipIfRegistersEqual doesn't change pc if not equal", () => {
    const register1 = 0;
    const register2 = 1;
    const number = 5;
    const startPc = 0;
    chip8.vRegisters[register1] = number;
    chip8.vRegisters[register2] = 0;

    expect(chip8.vRegisters[register1]).toBe(number);
    expect(chip8.vRegisters[register2]).toBe(0);
    expect(chip8.pc).toBe(startPc);

    chip8.skipIfRegistersEqual(register1, register2);

    expect(chip8.pc).toBe(startPc);
  });

  test("loadIntoRegister loads into register", () => {
    chip8.vRegisters[0] = 0;
    expect(chip8.vRegisters[0]).toBe(0);

    const number = 5;
    chip8.loadIntoRegister(0, number);

    expect(chip8.vRegisters[0]).toBe(number);
  });

  test("addToRegister adds to register", () => {
    chip8.vRegisters[0] = 0;
    expect(chip8.vRegisters[0]).toBe(0);

    const number = 3;
    chip8.addToRegister(0, number);

    expect(chip8.vRegisters[0]).toBe(number);
  });

  test("loadIntoRegister loads into register", () => {
    const number = 10;
    chip8.vRegisters[0] = 0;
    chip8.vRegisters[1] = number;
    expect(chip8.vRegisters[0]).toBe(0);
    expect(chip8.vRegisters[1]).toBe(number);
    chip8.loadYRegisterIntoXRegister(0, 1);
    expect(chip8.vRegisters[0]).toBe(number);
  });
  
  test("orRegister performs bitwise or on registers", () => {
    chip8.vRegisters[0] = 3;
    chip8.vRegisters[1] = 4;

    chip8.orRegister(0, 1);

    expect(chip8.vRegisters[0]).toBe(7);
  });

  test("xorRegister performs bitwise xor on registers", () => {
    chip8.vRegisters[0] = 3;
    chip8.vRegisters[1] = 7;

    chip8.xorRegister(0, 1);

    expect(chip8.vRegisters[0]).toBe(4);
  });

  test("andRegister performs bitwise and on registers", () => {
    chip8.vRegisters[0] = 3;
    chip8.vRegisters[1] = 7;

    chip8.andRegister(0, 1);

    expect(chip8.vRegisters[0]).toBe(3);
  });


  test("loadIntoIRegister loads into iRegister", () => {
    expect(chip8.iRegister).toBe(0);
    chip8.loadIntoIRegister(5);
    expect(chip8.iRegister).toBe(5);
  });

  test("addRegisters only keeps lowest 8 bits and sets carry flag", () => {
    chip8.vRegisters[0] = 255;
    chip8.vRegisters[1] = 255;

    expect(chip8.vRegisters[0xF]).toBe(0);
    expect(chip8.vRegisters[0]).toBe(255);
    expect(chip8.vRegisters[1]).toBe(255);

    chip8.addRegisters(0, 1);

    expect(chip8.vRegisters[0]).toBe(254);
    expect(chip8.vRegisters[0xF]).toBe(1);
  });

  test("addRegisters adds as expected", () => {
    chip8.vRegisters[0] = 5;
    chip8.vRegisters[1] = 5;

    expect(chip8.vRegisters[0xF]).toBe(0);
    expect(chip8.vRegisters[0]).toBe(5);
    expect(chip8.vRegisters[1]).toBe(5);

    chip8.addRegisters(0, 1);

    expect(chip8.vRegisters[0]).toBe(10);
    expect(chip8.vRegisters[0xF]).toBe(0);
  });

  test("subRegisters sets not carry as expected", () => {
    chip8.vRegisters[0] = 6;
    chip8.vRegisters[1] = 5;

    expect(chip8.vRegisters[0xF]).toBe(0);
    expect(chip8.vRegisters[0]).toBe(6);
    expect(chip8.vRegisters[1]).toBe(5);

    chip8.subRegisters(0, 1);

    expect(chip8.vRegisters[0]).toBe(1);
    expect(chip8.vRegisters[0xF]).toBe(1);
  });

  test("checkLeastSignificant sets VF to 1 when least sig bit is 1 and divides properly", () => {
    chip8.vRegisters[0] = 7;

    expect(chip8.vRegisters[0xF]).toBe(0);

    chip8.checkLeastSignificant(0);

    expect(chip8.vRegisters[0xF]).toBe(1);
    expect(chip8.vRegisters[0]).toBe(3);
  });

  test("checkLeastSignificant does not set VF to 1 when least sig bit is 1 and divides properly", () => {
    chip8.vRegisters[0] = 6;

    expect(chip8.vRegisters[0xF]).toBe(0);

    chip8.checkLeastSignificant(0);

    expect(chip8.vRegisters[0xF]).toBe(0);
    expect(chip8.vRegisters[0]).toBe(3);
  });

  test("checkMostSignificant sets VF to 1 when most sig bit is 1 and multiplies properly", () => {
    chip8.vRegisters[0] = 132;

    expect(chip8.vRegisters[0xF]).toBe(0);

    chip8.checkMostSignificant(0);

    expect(chip8.vRegisters[0xF]).toBe(1);
    expect(chip8.vRegisters[0]).toBe(8);
  });

  test("checkMostSignificant sets VF to 1 when most sig bit is 1 and multiplies properly", () => {
    chip8.vRegisters[0] = 2;

    expect(chip8.vRegisters[0xF]).toBe(0);

    chip8.checkMostSignificant(0);

    expect(chip8.vRegisters[0xF]).toBe(0);
    expect(chip8.vRegisters[0]).toBe(4);
  });
});