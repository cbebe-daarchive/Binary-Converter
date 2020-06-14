// toggles target bit 1 or 0
export const toggleBit = (bit) => {
  if (bit.classList.contains("on")) bit.classList.remove("on");
  else bit.classList.add("on");
  updateBit(bit);
  evaluateNum();
};

// updates bit's appearance
export const updateBit = (bit) => {
  if (bit.classList.contains("on")) bit.textContent = "1";
  else bit.textContent = "0";
};

// evaluate the target byte
const evaluateByte = (byte) => {
  let byteValue = 0;
  const bits = Array.from(byte.getElementsByClassName("bit"));
  for (let i = 0; i < 8; i++)
    if (bits[i].classList.contains("on")) byteValue += Math.pow(2, 7 - i); // add bit value if it's 1
  return byteValue;
};

// evaluates the whole number
export const evaluateNum = () => {
  const display = document.getElementById("numInput");
  // get array of bytes
  const bytes = Array.from(document.getElementsByClassName("byte"));
  let num = 0;
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[bytes.length - 1 - i];
    // add byte values to total
    num += evaluateByte(byte) * Math.pow(256, i);
  }
  display.value = String(num);
  // changes css property for width to fit all numbers
  display.style.width = display.value.length + 2 + "ch";
  document
    .querySelectorAll(".byte")
    .forEach((byte) => byte.classList.remove("overflow"));
};
