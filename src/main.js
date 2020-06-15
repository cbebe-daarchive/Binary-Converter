"use strict";
import { generateByte, addBytes, removeBytes } from "./bytegen.js";
import { binarySet } from "./binset.js";
import getBinary from "./getbin.js";

// generates first byte
document.getElementById("byteAdd").addEventListener("click", addBytes);
document.getElementById("byteRemove").addEventListener("click", removeBytes);
document.getElementById("numInput").addEventListener("input", binarySet);
document.getElementById("getBits").addEventListener("click", getBinary);

removeBytes();
generateByte();
