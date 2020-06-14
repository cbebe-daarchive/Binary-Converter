define("bit", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.evaluateNum = exports.updateBit = exports.toggleBit = void 0;
    // toggles target bit 1 or 0
    const toggleBit = (bit) => {
        if (bit.classList.contains("on"))
            bit.classList.remove("on");
        else
            bit.classList.add("on");
        updateBit(bit);
        evaluateNum();
    };
    exports.toggleBit = toggleBit;
    // updates bit's appearance
    const updateBit = (bit) => {
        if (bit.classList.contains("on"))
            bit.textContent = "1";
        else
            bit.textContent = "0";
    };
    exports.updateBit = updateBit;
    // evaluate the target byte
    const evaluateByte = (byte) => {
        let byteValue = 0;
        const bits = Array.from(byte.getElementsByClassName("bit"));
        for (let i = 0; i < 8; i++)
            if (bits[i].classList.contains("on"))
                byteValue += Math.pow(2, 7 - i); // add bit value if it's 1
        return byteValue;
    };
    // evaluates the whole number
    const evaluateNum = () => {
        const display = document.getElementById("numInput");
        // get array of bytes
        const bytes = (Array.from(document.getElementsByClassName("byte")));
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
    exports.evaluateNum = evaluateNum;
});
define("binset", ["require", "exports", "bit"], function (require, exports, bit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.binarySet = exports.evaluateNumInput = void 0;
    let tempInput;
    const numInput = document.getElementById("numInput");
    const inputToBin = (numEval) => {
        const binString = (numEval >>> 0).toString(2);
        const bitArray = document.querySelectorAll(".bit");
        bitArray.forEach((bit) => bit.classList.remove("on"));
        const binSlen = binString.length;
        const bitAlen = bitArray.length;
        for (let i = 1; i <= binSlen; i++)
            if (binString[binSlen - i] === "1")
                bitArray[bitAlen - i].classList.add("on");
        bitArray.forEach((bit) => bit_1.updateBit(bit));
    };
    const inputErrorHandle = (inputData) => {
        const invalidInput = inputData === "+" || inputData === "-";
        const zeroInput = inputData === "0" && numInput.value === "00";
        const emptyInput = numInput.value.length === 0;
        const bkspInput = inputData === null;
        const defInput = inputData !== undefined;
        const numStr = numInput.value.toString();
        if (invalidInput)
            numInput.value = String(tempInput);
        else if ((emptyInput && bkspInput) || zeroInput)
            numInput.value = "0";
        else if (numStr[0] === "0" && defInput && !bkspInput)
            numInput.value = numStr.substring(1);
    };
    const overflowHandle = () => {
        // max value is 2^n - 1
        const bitLength = document.querySelectorAll(".bit").length;
        const maxVal = Math.pow(2, bitLength) - 1;
        let numEval = Number(numInput.value);
        let overflow = false;
        if (numEval > maxVal) {
            numEval &= maxVal;
            overflow = true;
        }
        return { numEval, overflow };
    };
    exports.evaluateNumInput = () => {
        const bytes = document.querySelectorAll(".byte");
        const { numEval, overflow } = overflowHandle();
        bytes.forEach((byte) => byte.classList.remove("overflow"));
        if (overflow)
            bytes.forEach((byte) => byte.classList.add("overflow"));
        inputToBin(numEval);
    };
    exports.binarySet = (inputData) => {
        if (inputData == null)
            return;
        inputErrorHandle(inputData);
        if (tempInput !== numInput.value)
            exports.evaluateNumInput();
        tempInput = numInput.value;
        numInput.style.width = numInput.value.length + 2 + "ch";
    };
});
define("bytegen", ["require", "exports", "bit", "binset"], function (require, exports, bit_2, binset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeByte = exports.addByte = exports.generateByte = void 0;
    const container = document.getElementById("bytes");
    const byteEdit = document.getElementById("byteEdit");
    // fills byte with either 1s or 0s
    const fillButtonHandle = (e) => {
        const button = e.target;
        const byteElement = (button.parentElement.parentElement);
        const bits = (Array.from(byteElement.getElementsByClassName("bit")));
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
        bits.forEach((bit) => bit_2.updateBit(bit));
        bit_2.evaluateNum();
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
            bit.addEventListener("click", (e) => bit_2.toggleBit(e.target));
            byteWrap.appendChild(bit);
        }
        byte.appendChild(byteWrap);
        byte.appendChild(generateButtons());
        container.insertBefore(byte, container.firstChild);
    };
    exports.generateByte = generateByte;
    const addByte = () => {
        let byteCount = Array.from(document.getElementsByClassName("byte")).length;
        if (byteCount < 4) {
            generateByte();
            byteCount = byteCount + 1;
            byteEdit.innerText = `${byteCount * 8}` + " bits";
        }
        binset_1.evaluateNumInput();
    };
    exports.addByte = addByte;
    const removeByte = () => {
        let byteCount = Array.from(document.getElementsByClassName("byte")).length;
        if (byteCount > 1) {
            container.removeChild(container.firstChild);
            byteCount -= -1;
            byteEdit.innerText = `${byteCount * 8}` + " bits";
        }
        bit_2.evaluateNum();
    };
    exports.removeByte = removeByte;
});
define("getbin", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getBinary = void 0;
    // creates bit string from all the bits
    const generateBinStr = () => {
        const bits = document.querySelectorAll(".bit");
        let binStr = "";
        let leadingOne = false;
        for (let i = 0; i < bits.length; i++) {
            // will not generate string until leading 1
            if (!bits[i].classList.contains("on") && !leadingOne)
                continue;
            leadingOne = true;
            binStr += bits[i].classList.contains("on") ? "1" : "0";
        }
        return binStr;
    };
    // copies string to clipboard
    const copyToClipboard = (str) => {
        const textArea = document.createElement("textarea");
        textArea.value = str;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    };
    // the the current binary value as a string
    const getBinary = () => {
        const binStr = generateBinStr();
        copyToClipboard(binStr);
    };
    exports.getBinary = getBinary;
});
define("main", ["require", "exports", "bytegen", "binset", "getbin"], function (require, exports, bytegen_1, binset_2, getbin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // generates first byte
    bytegen_1.generateByte();
    document.getElementById("byteAdd").addEventListener("click", bytegen_1.addByte);
    document.getElementById("byteRemove").addEventListener("click", bytegen_1.removeByte);
    document.getElementById("numInput").addEventListener("input", (e) => binset_2.binarySet(e.data));
    document.getElementById("getBits").addEventListener("click", getbin_1.getBinary);
});
//# sourceMappingURL=main.js.map