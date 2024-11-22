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

    // Use a Promise to handle the asynchronous FileReader
    const romBuffer = await this.readFileAsArrayBuffer(file);

    this.interpreter = new Chip8();
    this.interpreter.romBuffer = romBuffer;
  }

  readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.onload = () => {
        if (fileReader.result) {
          resolve(fileReader.result as ArrayBuffer);
        } else {
          reject(new Error("File reading failed."));
        }
      };
  
      fileReader.onerror = () => {
        reject(new Error(`Error reading file: ${fileReader.error?.message}`));
      };
  
      fileReader.readAsArrayBuffer(file);
    });
  }
}