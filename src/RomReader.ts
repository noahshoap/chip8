import { Chip8 } from "./chip8";

export class RomReader
{
  input: HTMLInputElement;
  intepreter: Chip8;

  constructor()
  {
    const input = document.querySelector("input");
    if (input === null) throw new Error("Could not get input element.");
    this.input = input;
    this.input.addEventListener("change", this.readFile);
    this.intepreter = new Chip8();
  }

  async readFile(event: Event)
  {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files === null || inputElement.files[0] === null)
      throw new Error("Could not get file.");
    const file = inputElement.files[0];

    console.log(`File: ${file.name} uploaded.`);

    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    this.intepreter = new Chip8();
    this.intepreter.romBuffer = fileReader.result as ArrayBuffer;
  }
}