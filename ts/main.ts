import { generateByte, addByte, removeByte } from "./bytegen";
import { binarySet } from "./binset";
import { getBinary } from "./getbin";

// generates first byte
generateByte();

(<HTMLElement>document.getElementById("byteAdd")).addEventListener(
  "click",
  addByte
);
(<HTMLElement>document.getElementById("byteRemove")).addEventListener(
  "click",
  removeByte
);
(<HTMLElement>document.getElementById("numInput")).addEventListener(
  "input",
  (e) => binarySet((<InputEvent>e).data)
);
(<HTMLElement>document.getElementById("getBits")).addEventListener(
  "click",
  getBinary
);
