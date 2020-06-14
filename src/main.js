"use strict";
import { generateByte, addByte, removeByte } from "./bytegen.js";
import { binarySet } from "./binset.js";
import getBinary from "./getbin.js";

// generates first byte
generateByte();
document.getElementById("byteAdd").addEventListener("click", addByte);
document.getElementById("byteRemove").addEventListener("click", removeByte);
document
  .getElementById("numInput")
  .addEventListener("input", (e) => binarySet(e.data));
document.getElementById("getBits").addEventListener("click", getBinary);
