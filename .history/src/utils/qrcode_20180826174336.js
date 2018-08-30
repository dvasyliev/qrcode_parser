import _ from 'lodash'
import definitions from '@/config/qrcode'

const _isTwoDigits = (value) => {
  return value.match(/^\d{2}/) !== null
}

const parseBlob = (string) => {
  const id = string.slice(0, 2)
  const length = string.slice(2, 4)
  const value = string.slice(4, 4 + parseInt(length, 10))

  if (!_isTwoDigits(id) || !_isTwoDigits(length) || value.length !== parseInt(length, 10)) {
    return null
  }

  return {
    id,
    length,
    value
  }
}

const parse = (string) => {
  let blob = parseBlob(string)

  if (!blob) {
    return []
  }

  const remainder = string.slice(4 + parseInt(blob.length, 10))
  const childrenBlob = parseBlob(blob.value)

  if (childrenBlob) {
    childrenBlob.parent_id = blob.id
    blob.value = childrenBlob
  }

  return [blob, ...parse(remainder)]
}

const transformBlob = (object) => {
  let _definitions = definitions
  let definition = null

  if (_.has(object, 'parent_id')) {
    _definitions = _.find(_definitions, { id: object.parent_id })

    if (_.has(_definitions, 'children')) {
      _definitions = _definitions.children
    }
  }

  definition = _.find(_definitions, { id: object.id })

  if (!definition) {
    return null
  }

  return {
    [definition.name]: object.value
  }
}

const transform = (array) => {
  let blob = transformBlob(array[0] || {})

  if (!blob) {
    return []
  }

  const blobKey = Object.keys(blob)[0]
  const remainder = array.slice().splice(1)
  const childrenBlob = transformBlob(blob[blobKey] || {})
  console.log(childrenBlob)
  if (childrenBlob) {
    blob[blobKey] = childrenBlob
  }

  return {
    ...blob,
    ...transform(remainder)
  }
}

export {
  parseBlob,
  parse,
  transformBlob,
  transform
}
