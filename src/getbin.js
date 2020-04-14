// creates bit string from all the bits
let generateBinStr = () => {
  const bits = document.querySelectorAll('.bit')
  let binStr = ''
  let leadingOne = false
  for (let i = 0; i < bits.length; i++) {
    // will not generate string until leading 1
    if (!(bits[i].classList.contains('on')) && !leadingOne) continue
    
    leadingOne = true
    binStr += bits[i].classList.contains('on') ? '1' : '0'
  }

  return binStr
}

// copies string to clipboard
let copyToClipboard = str => {
  const textArea = document.createElement('textarea')
  textArea.value = str
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)  
}

// the the current binary value as a string
let getBinary = () => {
  const binStr = generateBinStr()
  copyToClipboard(binStr)
}

export {getBinary}