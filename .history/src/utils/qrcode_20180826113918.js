const parseBlob = (string) => {
  const regexIdAndLength = new RegExp('^(\\d{2})(\\d{2})')
  const mathcIdAndLength = string.match(regexIdAndLength)

  if (!mathcIdAndLength) {
    return null
  }

  const id = mathcIdAndLength[1]
  const length = mathcIdAndLength[2]
  const regexValue = new RegExp(`^(\\d{2})(\\d{2})([\\s\\S]{${length}})/`)
  const matchValue = string.match(regexValue)

  if (!matchValue) {
    return null
  }

  const value = matchValue[3]

  return { id, length, value, children: [] }
}

const parser = (string) => {
  let blob = parseBlob(string)
}

export {
  parseBlob
}
