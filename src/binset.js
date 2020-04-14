import {updateBit} from './bit.js'

let tempInput

let inputToBin = (numEval) => {
  const binString = (numEval >>> 0).toString(2)
  const bitArray = document.querySelectorAll('.bit')
  bitArray.forEach(bit => bit.classList.remove('on'))
  const binSlen = binString.length
  const bitAlen = bitArray.length 
  for (let i = 1; i <= binSlen; i++) {
    if (binString[binSlen - i] === '1') {
      bitArray[bitAlen - i].classList.add('on')
    }
  }
  
  bitArray.forEach(bit => updateBit(bit))
}

let inputErrorHandle = e => {
  const invalidInput = (e.data === '+') || (e.data === '-')
  const zeroInput = (e.data === '0') && (numInput.value === '00')
  const emptyInput = numInput.value.length === 0
  const bkspInput = e.data === null
  const defInput = e.data !== undefined
  const numStr = numInput.value.toString()

  if (invalidInput) {
    numInput.value = tempInput
  } else if ((emptyInput && bkspInput) || zeroInput) {
    numInput.value = 0
  } else if (numStr[0] === '0' && defInput && !bkspInput) {
    numInput.value = numStr.substring(1)
  }
}

let overflowHandle = () => {
  // max value is 2^n - 1
  const bitLength = document.querySelectorAll('.bit').length
  const maxVal = Math.pow(2, bitLength) - 1
  
  let numEval = numInput.value
  let overflow = false
  if (numEval > maxVal) {
    numEval &= maxVal
    overflow = true
  }
  return [numEval, overflow]
}

let evaluateNumInput = () => {

  const bytes = document.querySelectorAll('.byte')
  let [numEval, overflow] = overflowHandle()
  bytes.forEach(byte => byte.classList.remove('overflow'))
  if (overflow) bytes.forEach(byte => byte.classList.add('overflow'))
  inputToBin(numEval)

}


let binarySet = e => {
  inputErrorHandle(e)
  
  if (tempInput !== numInput.value) evaluateNumInput()
  
  tempInput = numInput.value
  numInput.style.width = (numInput.value.length + 2) + "ch"
}

export {binarySet, evaluateNumInput}