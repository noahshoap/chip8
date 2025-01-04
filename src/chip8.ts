import { IDisplay } from "./IDisplay";
const DISPLAY_WIDTH = 64;
const DISPLAY_HEIGHT = 32;
const MEMORY_SIZE = 4096;
const V_REGISTER_COUNT = 16;
const STACK_COUNT = 16;
const TIMER_COUNT = 2;
const UINT8_MAX_VALUE = 0xFF;

export class Chip8
{
  display: IDisplay;
  romBuffer: Uint8Array | null = null;
  displayBuffer = new Array<number>(DISPLAY_WIDTH * DISPLAY_HEIGHT).fill(0);
  stack = new Uint16Array(STACK_COUNT);
  memory = new Uint8Array(MEMORY_SIZE);
  vRegisters = new Uint8Array(V_REGISTER_COUNT);
  timers = new Uint8Array(TIMER_COUNT);
  iRegister = 0;
  pc = 0;
  sp = 0;
  
  constructor(display: IDisplay)
  {
    this.display = display;
  }

  setPixel(x: number, y: number, on: boolean)
  {
    this.displayBuffer[x + y * DISPLAY_WIDTH] = on ? 1 : 0;
  }

  clearScreen()
  {
    this.displayBuffer.fill(0);
  }

  returnFromSubroutine()
  {
    this.pc = this.stack[this.sp];
    this.sp--;
  }

  jumpToAddress(address: number)
  {
    this.pc = address;
  }

  callSubroutine(address: number)
  {
    this.sp++;
    this.stack[this.sp] = this.pc;
    this.pc = address;
  }

  skipIfEqual(register: number, kk: number)
  {
    const isRegisterEqualToKk = this.vRegisters[register] === kk;

    if (isRegisterEqualToKk)
    {
      this.skipInstruction();
    }
  }

  skipIfRegistersEqual(register1: number, register2: number)
  {
    const areRegistersEqual = this.vRegisters[register1] === this.vRegisters[register2];

    if (areRegistersEqual)
    {
      this.skipInstruction();
    }
  }

  skipIfNotEqual(register: number, kk: number)
  {
    const isRegisterEqualToKk = this.vRegisters[register] === kk;

    if (isRegisterEqualToKk === false)
    {
      this.skipInstruction();
    }
  }

  loadIntoRegister(register: number, kk: number)
  {
    this.vRegisters[register] = kk;
  }

  loadIntoIRegister(address: number)
  {
    this.iRegister = address;
  }

  addToRegister(register: number, kk: number)
  {
    this.vRegisters[register] += kk;
  }

  loadYRegisterIntoXRegister(xRegister: number, yRegister: number)
  {
    this.vRegisters[xRegister] = this.vRegisters[yRegister];
  }

  orRegister(xRegister: number, yRegister: number)
  {
    this.vRegisters[xRegister] |= this.vRegisters[yRegister];
  }

  andRegister(xRegister: number, yRegister: number)
  {
    this.vRegisters[xRegister] &= this.vRegisters[yRegister];
  }

  xorRegister(xRegister: number, yRegister: number)
  {
    this.vRegisters[xRegister] ^= this.vRegisters[yRegister];
  }

  addRegisters(xRegister: number, yRegister: number)
  {
    let sum = this.vRegisters[xRegister] + this.vRegisters[yRegister];
    let isResultTooLargeFor8Bits = sum > UINT8_MAX_VALUE;

    this.setVFRegister(isResultTooLargeFor8Bits ? 1 : 0);
    this.vRegisters[xRegister] = this.wrapTo8Bits(sum);
  }

  subRegisters(xRegister: number, yRegister: number)
  {
    let isXRegisterLarger = (this.vRegisters[xRegister] > this.vRegisters[yRegister]);

    this.setVFRegister(isXRegisterLarger ? 1 : 0);

    this.vRegisters[xRegister] -= this.vRegisters[yRegister];
  }

  checkLeastSignificant(xRegister: number)
  {
    const leastSignificantBit = 1;
    let bitValue = this.vRegisters[xRegister] & leastSignificantBit;

    this.setVFRegister(bitValue);
    this.divideRegisterByTwo(xRegister);
  }

  checkMostSignificant(xRegister: number)
  {
    const mostSignificantBit = 128;
    let bitValue = this.vRegisters[xRegister] & mostSignificantBit;

    this.setVFRegister(bitValue === 0 ? 0 : 1);
    this.multiplyRegisterByTwo(xRegister);
  }

  private setVFRegister(value: number)
  {
    this.vRegisters[0xF] = value;
  }

  private divideRegisterByTwo(register: number)
  {
    this.vRegisters[register] /= 2;
  }

  private multiplyRegisterByTwo(register: number)
  {
    this.vRegisters[register] = this.wrapTo8Bits(this.vRegisters[register] * 2);
  }

  private skipInstruction()
  {
    this.pc += 2;
  }

  private wrapTo8Bits(num: number) : number
  {
    return num & UINT8_MAX_VALUE;
  }
};