const treeBuilder = (string) => {
  const id = string.splice(0, 2)
  const length = string.splice(2, 2)
  const value = string.splice(4, length)

  console.log(id, length, value)
}

export {
  treeBuilder
}
