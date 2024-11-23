import { IDisplay } from "./IDisplay";
const DISPLAY_WIDTH = 64;
export class Display implements IDisplay
{
  offColor = "black";
  onColor = "white;"
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
  }
}