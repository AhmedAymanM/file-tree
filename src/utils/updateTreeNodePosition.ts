import { TreeNode } from '@/types/api'

const updateTreeNode = (
  nodes: TreeNode[],
  targetId: string,
  subtree: TreeNode
): TreeNode[] => {
  const updatedNodes = [...nodes]

  for (const index in updatedNodes) {
    const node = updatedNodes[index]
    if (node.id === targetId) {
      // If target node has children, add subtree at the end
      if (node.children) node.children.push(subtree)
      // If target node has no children, insert subtree after the target
      else updatedNodes.splice(+index + 1, 0, subtree)

      break
    }

    if (node.children)
      node.children = updateTreeNode(node.children, targetId, subtree)
  }

  return updatedNodes
}

const findAndRemoveSubtree = (
  nodes: TreeNode[],
  nodeId: string
): [TreeNode | undefined, TreeNode[]] => {
  // Recursively search and remove the node with nodeId
  for (const index in nodes) {
    const node = nodes[index]
    if (node.id === nodeId) {
      const removedNode = nodes.splice(+index, 1)[0]
      return [removedNode, nodes]
    }
    // If the current node has children, search recursively
    if (node.children) {
      const [removedNode, updatedChildren] = findAndRemoveSubtree(
        node.children,
        nodeId
      )
      if (removedNode) {
        node.children = updatedChildren
        return [removedNode, nodes]
      }
    }
  }
  return [undefined, nodes]
}

export const updateTreeNodePosition = ({
  dataTree,
  itemId,
  targetId,
}: {
  dataTree: TreeNode[]
  itemId: string
  targetId: string
}) => {
  // Step 1: Find and remove the dragged subtree
  const [subtreeToMove] = findAndRemoveSubtree(dataTree, itemId)
  // if no sorting is needed, return the original tree nodes
  if (!subtreeToMove) return dataTree

  // Step 2: Insert the subtree at the new location
  return updateTreeNode(dataTree, targetId, subtreeToMove)
}
