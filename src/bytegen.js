import {toggleBit, evaluateNum, updateBit} from './bit.js'
import {evaluateNumInput} from './binset.js'

const container = document.getElementById('container')
const byteEdit = document.getElementById('byteEdit')

let fillButtonHandle = e => {
  const bits = Array.from(e.target.parentNode.parentNode.getElementsByClassName('bit'))
  if (e.target.classList.contains('ones')) {
    bits.filter(bit => !bit.classList.contains('on')).forEach(bit => {
      bit.classList.add('on')
    })
  } else {
    bits.filter(bit => bit.classList.contains('on')).forEach(bit => {
      bit.classList.remove('on')
    })
  }
  bits.forEach(bit => updateBit(bit))
  evaluateNum()
}

let generateButtons = () => {
  const btnWrap = document.createElement('div')
  btnWrap.className = 'btn-wrap'
  const classNames = ['zeros','ones']
  for (let i = 0; i < 2; i ++) {
    const fillBtn = document.createElement('button')
    fillBtn.className = "fill-btn " + classNames[i]
    fillBtn.innerText = "Fill " + i + "'s"
    fillBtn.addEventListener('click', fillButtonHandle)
    btnWrap.appendChild(fillBtn)
  }
  return btnWrap
}

let generateByte = () => {
  const byte = document.createElement('div')
  byte.className = 'byte'
  byte.appendChild(generateButtons())

  const byteWrap = document.createElement('div')
  byteWrap.className = 'byte-wrap'

  for (let i = 0; i < 8; i++) {
    const bit = document.createElement('div')
    bit.className = 'bit'
    bit.textContent = '0'
    bit.addEventListener('click', toggleBit)
    byteWrap.appendChild(bit)
  }
  byte.appendChild(byteWrap)

  container.insertBefore(byte, container.firstChild)
}

let addByte = () => {
  const numInput = document.getElementById('numInput')
  let byteCount = Array.from(document.getElementsByClassName('byte')).length
  if (byteCount < 4) {
    generateByte()
    byteCount = byteCount + 1
    byteEdit.innerText = `${byteCount * 8}` + ' bits'
  }
  evaluateNumInput()
}

let removeByte = () => {
  let byteCount = Array.from(document.getElementsByClassName('byte')).length
  if (byteCount > 1) {
    container.removeChild(container.firstChild)
    byteCount = byteCount - 1
    byteEdit.innerText = `${byteCount * 8}` + ' bits'
  }
  evaluateNum()
}

export {generateByte, addByte, removeByte}