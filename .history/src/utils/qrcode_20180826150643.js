const _isTwoDigits = (value) => {
  return value.match(/^\d{2}/)
}

const parseBlob = (string) => {
  const id = string.slice(0, 2)
  const length = string.slice(2, 4)
  const value = string.slice(4, 4 + parseInt(length, 10))

  console.log(id, length, value)

  if (!_isTwoDigits(id) || !_isTwoDigits(length) || value.length !== length) {
    console.log('fuck')
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

  return [blob, ...parse(remainder)]
}

export {
  parseBlob,
  parse
}
