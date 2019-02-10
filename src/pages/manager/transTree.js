// const TEST_DATA = [
//   {id: 1, group: [ 'folder-1', 'folder-2' ]},
//   {id: 2, group: [ 'folder-1' ]},
//   {id: 3, group: []},
//   {id: 4, group: [ 'folder-1', 'folder-2', 'folder-3']}
// ]
class Node {
  constructor () {
    this.subTree = new Map()
    this.leaves = new Set()
  }
  appendTree (tree) {
    if (!this.subTree.has(tree)) {
      this.subTree.set(tree, new Node())
    }
  }
  appendLeaf (leaf) {
    this.leaves.add(leaf)
  }
}

function buildTree (list) {
  const len = list.length
  const tree = new Node()
  for (let i = 0; i < len; i++) {
    appendRecord(tree, 0, list[i])
  }
  return tree
}
function appendRecord (node, pos, record) {
  if (pos === record.group.length) {
    node.appendLeaf(record)
  } else {
    let child = record.group[pos]
    node.appendTree(child)
    appendRecord(node.subTree.get(child), pos + 1, record)
  }
}

function transTree (tree) {
  let renderTree = {}
  transTreeDFS(tree, renderTree)
  return renderTree
}
function transTreeDFS(node, renderNode) {
  renderNode.children = []
  if (node.subTree.size > 0) {
    for (let key of node.subTree.keys()) {
      let child = {
        key,
        type: 'folder',
        name: key
      }
      renderNode.children.push(child)
      transTreeDFS(node.subTree.get(key), child)
    }
  }
  if (node.leaves.size > 0) {
    for (let value of node.leaves.values()) {
      renderNode.children.push({
        key: value.id,
        name: value.title,
        ...value
      })
    }
  }
}

function getRenderTree (list) {
  const ans = buildTree(list)
  return transTree(ans)
}

export {getRenderTree}
// const ans = buildTree(TEST_DATA)
// console.log(ans)
// console.log('======')
// console.log(JSON.stringify(transTree(ans)))
// console.log((JSON.stringify(buildTree(TEST_DATA))))