const parseBlob = (string) => {
  const id = string.slice(0, 2)
  const length = string.slice(2, 4)
  const value = string.slice(4, 4 + parseInt(length, 10))

  return { id, length, value, children: [] }
}

const parser = (string) => {
  let blob = parseBlob(string)
}

export {
  parseBlob
}
