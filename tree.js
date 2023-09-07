/**
 * TreeNode: node for a general tree.
 *
 * @format
 */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    const sumHelper = (node) => {
      if (!node) {
        return 0;
      }
      let sum = node.val;
      for (const child of node.children) {
        sum += sumHelper(child);
      }
      return sum;
    };
    return sumHelper(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    const countHelper = (node) => {
      if (!node) {
        return 0;
      }
      let count = node.val % 2 === 0 ? 1 : 0;
      for (const child of node.children) {
        count += countHelper(child);
      }
      return count;
    };
    return countHelper(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    const countHelper = (node) => {
      if (!node) {
        return 0;
      }
      let count = node.val >= lowerBound ? 1 : 0;
      for (const child of node.children) {
        count += countHelper(child);
      }
      return count;
    };
    return countHelper(this.root);
  }
}

module.exports = { Tree, TreeNode };
