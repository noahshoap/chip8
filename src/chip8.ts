import { IDisplay } from "./IDisplay";
const DISPLAY_WIDTH = 64;
const DISPLAY_HEIGHT = 32;
const MEMORY_SIZE = 4096;
const V_REGISTER_COUNT = 16;
const STACK_COUNT = 16;
const TIMER_COUNT = 2;

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
    if (this.vRegisters[register] === kk)
    {
      this.pc += 2;
    }
  }

  skipIfRegistersEqual(register1: number, register2: number)
  {
    if (this.vRegisters[register1] === this.vRegisters[register2])
    {
      this.pc += 2;
    }
  }

  skipIfNotEqual(register: number, kk: number)
  {
    if (this.vRegisters[register] !== kk)
    {
      this.pc += 2;
    }
  }
};