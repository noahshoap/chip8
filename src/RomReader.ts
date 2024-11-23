import { Chip8 } from "./chip8";

export class RomReader
{
  input: HTMLInputElement;
  interpreter: Chip8;

  constructor()
  {
    const input = document.querySelector("input");
    if (input === null) throw new Error("Could not get input element.");
    this.input = input;
    this.input.addEventListener("change", this.readFile);
    this.interpreter = new Chip8();
  }

  async readFile(event: Event)
  {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files === null || inputElement.files[0] === null)
      throw new Error("Could not get file.");
    const file = inputElement.files[0];

    console.log(`File: ${file.name} uploaded.`);

    const fr = new FileReader();

    fr.onload = () => {
      if (fr.result instanceof ArrayBuffer) {
        this.interpreter = new Chip8();
        this.interpreter.romBuffer = new Uint8Array(fr.result); // Convert the ArrayBuffer to Uint8Array
        console.log("CHIP-8 ROM loaded.");
    }
    };

    fr.readAsArrayBuffer(file);
  }
}