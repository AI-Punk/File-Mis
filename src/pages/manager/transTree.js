// const TEST_DATA = [
//   {id: 1, group: [ 'folder-1', 'folder-2' ]},
//   {id: 2, group: [ 'folder-1' ]},
//   {id: 3, group: []},
//   {id: 4, group: [ 'folder-1', 'folder-2', 'folder-3']}
// ]
class IDProducer {
  constructor () {
    this.id = 0
  }
  getId () {
    return this.id++
  }
  init () {
    this.id = 0
  }
}
const producer = new IDProducer()
class Node {
  constructor (group = []) {
    this.subTree = new Map()
    this.leaves = new Set()
    this.group = group
    this.id = '_fake_'
    this.type = 'folder'
  }
  appendTree (tree, group) {
    if (!this.subTree.has(tree)) {
      this.subTree.set(tree, new Node(group))
    }
  }
  appendLeaf (leaf) {
    if (leaf.id.slice(0, 6) !== '_fake_') {
      this.leaves.add(leaf)
    }
  }
  hasNode (group) {
    if (group.length === 0) {
      return true
    } else {
      if (this.subTree.has(group[0])) {
        return this.subTree.get(group[0]).hasNode(group.slice(1))
      } 
      return false
    }
  }
  getNode (group) {
    if (group.length === 0) {
      return this
    } else {
      if (this.subTree.has(group[0])) {
        return this.subTree.get(group[0]).getNode(group.slice(1))
      } 
      return false
    }
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
    node.appendTree(child, record.group.slice(0, pos + 1))
    appendRecord(node.subTree.get(child), pos + 1, record)
  }
}

function transTree (tree, list) {
  let renderTree = {id: 'root', key: 'root', type: 'folder', name: 'root', group: []}
  let folderTree = {...renderTree}
  producer.init()
  adjustFolders(list, tree)
  transTreeDFS(tree, renderTree, folderTree)
  return { renderTree, folderTree }
}
function adjustFolders (list, tree) {
  const folders = list.filter(item => {
    return item.type === 'folder'
  })
  console.table(folders)
  folders.forEach(folder => {
    let node = tree.getNode(folder.group)
    console.log('node', node)
    if (node !== false) {
      node.id = folder.id
      node.limit = folder.limit
    }
  })
}
function transTreeDFS(node, renderNode, folderNode) {
  renderNode.children = []
  folderNode.children = []
  if (node.subTree.size > 0) {
    for (let [key, value] of node.subTree.entries()) {
      let child = {
        id: value.id,
        key,
        type: value.type,
        name: key,
        group: value.group,
        limit: value.limit || null
      }
      let fchild = {...child}
      renderNode.children.push(child)
      folderNode.children.push(fchild)
      transTreeDFS(node.subTree.get(key), child, fchild)
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

function getRenderTree (list = []) {
  const ans = buildTree(list)
  const {folderTree, renderTree} = transTree(ans, list)
  return {
    folderTree,
    renderTree,
    hashTree: ans
  }
}

export {getRenderTree}
// const TEST_DATA = []
// const ans = getRenderTree(TEST_DATA)
// console.log(ans.hasNode(['folder-1']))
// console.log(ans.hasNode(['folder-2']))
// console.log(ans.hasNode(['folder-1', 'folder-2']))
// console.log(ans.hasNode([]))
// console.log(ans)
// console.log('======')
// console.log(JSON.stringify(transTree(ans)))
// console.log((JSON.stringify(buildTree(TEST_DATA))))