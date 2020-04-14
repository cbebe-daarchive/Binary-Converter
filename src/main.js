import {generateByte, addByte, removeByte} from './bytegen.js'
import {binarySet} from './binset.js'
import {getBinary} from './getbin.js'

// generates first byte
generateByte()

document.getElementById('byteAdd').addEventListener('click', addByte)
document.getElementById('byteRemove').addEventListener('click', removeByte)
document.getElementById('numInput').addEventListener('input', binarySet)
document.getElementById('getBits').addEventListener('click', getBinary)
