const treeBuilder = (value) => {
  const id = value.splice(0, 2)
  const length = value.splice(2, 2)
  const value = value.splice(4, length)

  console.log(id, length, value)
}

export {
  treeBuilder
}
