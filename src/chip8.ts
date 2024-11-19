const DISPLAY_WIDTH = 64;

export class Chip8
{
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  displayScale: number;

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
  }

  setPixel(x: number, y: number, on: boolean)
  {
    this.canvasContext.fillStyle = on ? "white" : "black";
    this.canvasContext.fillRect(x, y, this.displayScale, this.displayScale);
  }
};