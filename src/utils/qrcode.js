import _ from 'lodash'
import { CRC } from 'crc-full'
import definitions from '@/config/qrcode'

const _isTwoDigits = (value) => {
  return value.match(/^\d{2}/) !== null
}

const _isValue = (value, length) => {
  return value.length && value.length === parseInt(length, 10)
}

const _getCRC = (qrcode) => {
  const lastBlob = qrcode.slice(qrcode.length - 8, qrcode.length)
  const id = lastBlob.slice(0, 2)
  const length = lastBlob.slice(2, 4)
  const value = lastBlob.slice(4, 8)

  return (id === '63' && length === '04' && value.length === 4) ? value : null
}

const _calcCRC = (qrcode) => {
  const string = qrcode.slice(0, -8)
  const crc = new CRC('CRC16', 16, 0x1027, 0xFFFF)
  const demical = crc.compute(Buffer.from(string, 'ascii'))
  const hex = demical.toString(16).toUpperCase()

  console.error('CRC should be equal: ', hex)

  return hex
}

const isCorrectChecksum = (qrcode) => {
  const crc = _getCRC(qrcode)

  return crc ? crc === _calcCRC(qrcode) : false
}

const parseBlob = (string) => {
  const id = string.slice(0, 2)
  const length = string.slice(2, 4)
  const value = string.slice(4, 4 + parseInt(length, 10))

  if (!_isTwoDigits(id) || !_isTwoDigits(length) || !_isValue(value, length)) {
    return null
  }

  return { id, length, value }
}

const parse = (string, deep, deepCounter = 0) => {
  let blob = parseBlob(string)

  if (!blob) {
    return []
  }

  const blobChild = parseBlob(blob.value)

  if (blobChild && deepCounter < deep) {
    const remainderChild = blob.value.slice(4 + parseInt(blobChild.length, 10))
    const blobChildren = [blobChild, ...parse(remainderChild, deep, ++deepCounter)].map(el => {
      el.parent_id = blob.id

      return el
    })

    blob.value = blobChildren
  }

  const remainder = string.slice(4 + parseInt(blob.length, 10))

  return [blob, ...parse(remainder, deep, deepCounter)]
}

const transform = (definitions, fields) => {
  const model = {}

  definitions.forEach(definition => {
    const field = _.find(fields, { id: definition.id })

    if (!_.has(definition, 'name')) {
      console.error(`Missed "name" attribute for definition with ID = ${definition.id}`)
      return false
    }

    if (_.has(definition, 'children')) {
      const value = _.has(field, 'value') && _.isArray(field.value) ? field.value : []

      model[definition.name] = transform(definition.children, value)
    } else {
      model[definition.name] = _.has(field, 'value') ? field.value : null
    }
  })

  return model
}

const getQrCodeModel = (qrcode) => {
  return transform(definitions, parse(qrcode, 2))
}

export {
  isCorrectChecksum,
  parseBlob,
  parse,
  transform,
  getQrCodeModel
}
