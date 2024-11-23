const DISPLAY_WIDTH = 64;
const DISPLAY_HEIGHT = 32;
const MEMORY_SIZE = 4096;
const V_REGISTER_COUNT = 16;
const STACK_COUNT = 16;
const TIMER_COUNT = 2;

export class Chip8
{
  offColor = "black";
  onColor = "white";
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  displayScale: number;
  romBuffer: ArrayBuffer | null = null;
  displayBuffer = new Array<number>(DISPLAY_WIDTH * DISPLAY_HEIGHT).fill(0);
  stack = new Uint16Array(STACK_COUNT);
  memory = new Uint8Array(MEMORY_SIZE);
  vRegisters = new Uint8Array(V_REGISTER_COUNT);
  timers = new Uint8Array(TIMER_COUNT);
  iRegister = 0;
  pc = 0;
  sp = 0;
  

  constructor()
  {
    let canvas = document.querySelector("canvas");
    if (canvas === null) throw new Error("Could not find canvas element.");

    let context = canvas.getContext("2d");
    if (context === null) throw new Error("Could not get canvas context.");

    this.canvas = canvas;
    this.canvasContext = context;
    this.displayScale = this.canvas.width / DISPLAY_WIDTH;
  }

  setPixel(x: number, y: number, on: boolean)
  {
    this.displayBuffer[x + y * DISPLAY_WIDTH] = on ? 1 : 0;
  }

  clearScreen()
  {
    this.displayBuffer.fill(0);
  }
};