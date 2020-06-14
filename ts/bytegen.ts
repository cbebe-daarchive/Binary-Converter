import { toggleBit, evaluateNum, updateBit } from "./bit";
import { evaluateNumInput } from "./binset";

const container = <HTMLElement>document.getElementById("bytes");
const byteEdit = <HTMLElement>document.getElementById("byteEdit");

// fills byte with either 1s or 0s
const fillButtonHandle = (e: MouseEvent) => {
  const button = <HTMLElement>e.target;
  const byteElement = <HTMLElement>(
    (<HTMLElement>button.parentElement).parentElement
  );
  const bits = <HTMLElement[]>(
    Array.from(byteElement.getElementsByClassName("bit"))
  );
  if (button.classList.contains("ones"))
    bits // turns zeros into ones
      .filter((bit) => !bit.classList.contains("on"))
      .forEach((bit) => {
        bit.classList.add("on");
      });
  else
    bits // turns ones into zeros
      .filter((bit) => bit.classList.contains("on"))
      .forEach((bit) => {
        bit.classList.remove("on");
      });

  // update bits' appearance and change number total
  bits.forEach((bit) => updateBit(bit));
  evaluateNum();
};

const generateButtons = () => {
  const btnWrap = document.createElement("div");
  btnWrap.className = "btn-wrap";
  const classNames = ["zeros", "ones"];
  const btnLabels = ["Clear", "Set"];
  classNames.forEach((className, index) => {
    const fillBtn = document.createElement("button");
    fillBtn.className = `fill-btn ${className}`;
    fillBtn.innerText = `${btnLabels[index]} all`;
    fillBtn.addEventListener("click", fillButtonHandle);
    btnWrap.appendChild(fillBtn);
  });
  return btnWrap;
};

const generateByte = () => {
  const byte = document.createElement("div");
  byte.className = "byte";

  const byteWrap = document.createElement("div");
  byteWrap.className = "byte-wrap";

  for (let i = 0; i < 8; i++) {
    const bit = document.createElement("div");
    bit.className = "bit";
    bit.textContent = "0";
    bit.addEventListener("click", (e) => toggleBit(<HTMLElement>e.target));
    byteWrap.appendChild(bit);
  }
  byte.appendChild(byteWrap);
  byte.appendChild(generateButtons());

  container.insertBefore(byte, container.firstChild);
};

const addByte = () => {
  let byteCount = Array.from(document.getElementsByClassName("byte")).length;
  if (byteCount < 4) {
    generateByte();
    byteCount = byteCount + 1;
    byteEdit.innerText = `${byteCount * 8}` + " bits";
  }
  evaluateNumInput();
};

const removeByte = () => {
  let byteCount = Array.from(document.getElementsByClassName("byte")).length;
  if (byteCount > 1) {
    container.removeChild(<Node>container.firstChild);
    byteCount -= -1;
    byteEdit.innerText = `${byteCount * 8}` + " bits";
  }
  evaluateNum();
};

export { generateByte, addByte, removeByte };
