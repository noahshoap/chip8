const DISPLAY_WIDTH = 64;
const MEMORY_SIZE = 4096;
const V_REGISTER_COUNT = 16;
const STACK_COUNT = 16;
const TIMER_COUNT = 2;

export class Chip8
{
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  displayScale: number;
  romBuffer: ArrayBuffer | null = null;
  stack: Uint16Array;
  memory: Uint8Array;
  vRegisters: Uint8Array;
  timers: Uint8Array;
  iRegister: number;
  pc: number;
  sp: number;

  constructor()
  {
    let canvas = document.querySelector("canvas");
    if (canvas === null) throw new Error("Could not find canvas element.");

    let context = canvas.getContext("2d");
    if (context === null) throw new Error("Could not get canvas context.");

    this.canvas = canvas;
    this.canvasContext = context;
    this.displayScale = this.canvas.width / DISPLAY_WIDTH;
    this.canvasContext.fillStyle = "black";
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.stack = new Uint16Array(STACK_COUNT);
    this.memory = new Uint8Array(MEMORY_SIZE);
    this.vRegisters = new Uint8Array(V_REGISTER_COUNT);
    this.timers = new Uint8Array(TIMER_COUNT);
    this.iRegister = 0;
    this.sp = 0;
    this.pc = 0;
  }

  setPixel(x: number, y: number, on: boolean)
  {
    this.canvasContext.fillStyle = on ? "white" : "black";
    this.canvasContext.fillRect(x, y, this.displayScale, this.displayScale);
  }
};