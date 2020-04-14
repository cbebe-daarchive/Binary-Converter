// togggles target bit 1 or 0
let toggleBit = e => {
  if (e.target.classList.contains('on')) {
    e.target.classList.remove('on')
  } else {
    e.target.classList.add('on')
  }
  updateBit(e.target)
  evaluateNum()
}

// updates bit's appearance
let updateBit = bit => {
  if (bit.classList.contains('on')) {
    bit.textContent = '1'
  } else {
    bit.textContent = '0'
  }
}

// evaluate the target byte
let evaluateByte = byte => {
  let byteValue = 0
  const bits = Array.from(byte.getElementsByClassName('bit'))
  for (let i = 0; i < 8; i++) {
    // add bit value if it's 1
    if (bits[i].classList.contains('on')) {
      byteValue += Math.pow(2, 7 - i)
    }
  }
  return byteValue
}

// evaluates the whole number
let evaluateNum = () => {
  const display = document.getElementById('numInput')
  // get array of bytes
  const bytes = Array.from(container.getElementsByClassName('byte'))
  let num = 0
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[bytes.length - 1 - i]
    // add byte values to total
    num += (evaluateByte(byte) * Math.pow(256, i))
  }
  display.value = num
  // changes css property for width to fit all numbers
  display.style.width = (display.value.length + 2) + "ch"
  document.querySelectorAll('.byte').forEach(byte => byte.classList.remove('overflow'))
}

export {toggleBit, updateBit, evaluateNum}