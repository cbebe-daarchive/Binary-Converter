let generateBinStr = () => {
  const bits = document.querySelectorAll('.bit')
  let binStr = ''
  let i = 0
  let firstOne = false
  while (i < bits.length) {
    if (!(bits[i].classList.contains('on')) && !firstOne) {
      i++
    } else {
      firstOne = true
      if (bits[i].classList.contains('on')) {
        binStr += '1'
      } else {
        binStr += '0'
      }
      i++
    }   
  }
  return binStr
}

let copyToClipboard = str => {
  const textArea = document.createElement('textarea')
  textArea.value = str
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)  
}

let getBinary = () => {
  const binStr = generateBinStr()
  copyToClipboard(binStr)
}

export {getBinary}