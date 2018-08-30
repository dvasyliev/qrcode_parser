const treeBuilder = (string) => {
  const id = string.slice(0, 2)
  const length = string.slice(2, 2)
  const value = string.slice(4, length)

  console.log(id, length, value)
}

export {
  treeBuilder
}
