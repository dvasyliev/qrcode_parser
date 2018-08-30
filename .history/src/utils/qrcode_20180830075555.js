import _ from 'lodash'
import definitions from '@/config/qrcode'

const _isTwoDigits = (value) => {
  return value.match(/^\d{2}/) !== null
}

const _isValue = (value, length) => {
  return value.length && value.length === parseInt(length, 10)
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

const parse = (string, counter = 0) => {
  let blob = parseBlob(string)

  if (!blob) {
    return []
  }

  const blobChild = parseBlob(blob.value)

  if (blobChild) {
    const remainderChild = blob.value.slice(4 + parseInt(blobChild.length, 10))
    const blobChildren = [blobChild, ...parse(remainderChild)].map(el => {
      el.parent_id = blob.id

      return el
    })

    blob.value = blobChildren
  }

  const remainder = string.slice(4 + parseInt(blob.length, 10))

  return [blob, ...parse(remainder)]
}

// const transformBlob = (object) => {
//   let _definitions = definitions
//   let definition = null

//   if (_.has(object, 'parent_id')) {
//     _definitions = _.find(_definitions, { id: object.parent_id }).children
//   }

//   definition = _.find(_definitions, { id: object.id })

//   if (!definition) {
//     return null
//   }

//   return {
//     [definition.name]: _.hasIn(definition, `default[${object.value}]`)
//       ? definition.default[object.value]
//       : object.value
//   }
// }

// const transform = (array) => {
//   let blob = transformBlob(array[0] || {})

//   if (!blob) {
//     return []
//   }

//   const blobKey = Object.keys(blob)[0]
//   const remainder = array.slice().splice(1)
//   const childrenBlob = transformBlob(blob[blobKey] || {})

//   if (childrenBlob) {
//     blob[blobKey] = childrenBlob
//   }

//   return {
//     ...blob,
//     ...transform(remainder)
//   }
// }

const transform2 = (definitions, fields) => {
  const model = {}

  definitions.forEach(definition => {
    const field = _.find(fields, { id: definition.id })

    if (!_.has(definition, 'name')) {
      console.error(`Missed "name" attribute for definition with ID = ${definition.id}`)
      return false
    }

    if (_.has(definition, 'children') && _.has(field, 'children')) {

    }

    model[definition.name] = _.has(field, 'value') ? field.value : null
  })

  return model
}

const getQrCodeModel = (object) => {
  return transform2(definitions, object)
}

export {
  parseBlob,
  parse,
  // transformBlob,
  // transform,
  transform2,
  getQrCodeModel
}
