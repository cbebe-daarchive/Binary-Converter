const display = document.getElementById('numInput')

let toggleBit = e => {
  if (e.target.classList.contains('on')) {
    e.target.classList.remove('on')
  } else {
    e.target.classList.add('on')
  }
  updateBit(e.target)
  evaluateNum()
}

let updateBit = bit => {
  if (bit.classList.contains('on')) {
    bit.textContent = '1'
  } else {
    bit.textContent = '0'
  }
}

let evaluateByte = byte => {
  let byteValue = 0
  const bits = Array.from(byte.getElementsByClassName('bit'))
  for (let i = 0; i < 8; i++) {
    if (bits[i].classList.contains('on')) {
      byteValue = byteValue + Math.pow(2, 7 - i)
    }
  }
  return byteValue
}

let evaluateNum = () => {
  const bytes = Array.from(container.getElementsByClassName('byte'))
  let num = 0
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[bytes.length - 1 - i]
    const power =  i
    num = num + (evaluateByte(byte) * Math.pow(256, power))
  }
  display.value = num
  display.style.width = (display.value.length + 2) + "ch"
  document.querySelectorAll('.byte').forEach(byte => byte.classList.remove('overflow'))
}

export {toggleBit, updateBit, evaluateNum}