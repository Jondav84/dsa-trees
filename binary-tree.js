/**
 * BinaryTreeNode: node for a general tree.
 *
 * @format
 */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) {
      return 0;
    }
    const queue = [{ node: this.root, depth: 1 }];
    while (queue.length > 0) {
      const { node, depth } = queue.shift();
      if (!node.left && !node.right) {
        return depth;
      }
      if (node.left) {
        queue.push({ node: node.left, depth: depth + 1 });
      }
      if (node.right) {
        queue.push({ node: node.right, depth: depth + 1 });
      }
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    const findMaxDepth = (node) => {
      if (!node) {
        return 0;
      }
      const leftDepth = findMaxDepth(node.left);
      const rightDepth = findMaxDepth(node.right);
      return Math.max(leftDepth, rightDepth) + 1;
    };
    return findMaxDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    const maxSumHelper = (node) => {
      if (!node) {
        return 0;
      }
      const leftSum = maxSumHelper(node.left);
      const rigthSum = maxSumHelper(node.right);
      return Math.max(0, leftSum, rigthSum) + node.val;
    };
    return maxSumHelper(this.root);
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null;
    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.val > lowerBound) {
        result = currentNode.val;
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const getNodeLevelAndParent = (root, target, parent = null, level = 0) => {
      if (!root) {
        return null;
      }
      if (root.val === target) {
        return { level, parent };
      }

      const leftResult = getNodeLevelAndParent(
        root.left,
        target,
        root,
        level + 1
      );
      const rightResult = getNodeLevelAndParent(
        root.right,
        target,
        root,
        level + 1
      );
      return leftResult || rightResult;
    };
    const node1Info = getNodeLevelAndParent(this.root, node1);
    const node2Info = getNodeLevelAndParent(this.root, node2);

    return (
      node1Info &&
      node2Info &&
      node1Info.level === node2Info.level &&
      node1Info.parent !== node2Info.parent
    );
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {
    if (!node) {
      return null;
    }
    const leftSerialized = BinaryTree.serialize(node.left);
    const rightSerialized = BinaryTree.serialize(node.right);

    return `${node.val},${leftSerialized},${rightSerialized},`;
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(serialized) {
    const values = serialized.split(",");
    const deserializedHelper = () => {
      const val = values.shift();
      if (val === null) {
        return null;
      }
      const node = new BinaryTreeNode(parseInt(val));
      node.left = deserializedHelper();
      node.right = deserializedHelper();
      return node;
    };
    return new BinaryTree(deserializedHelper());
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    const findLCA = (root, p, q) => {
      if (!root || root === p || root === q) {
        return root;
      }
      const left = findLCA(root.left, p, q);
      const right = findLCA(root.right, p, q);
      if (left && right) {
        return root;
      }
      return left || right;
    };
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
