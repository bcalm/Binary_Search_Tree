const {visitInOrder} = require('./traversal');
const {rotate} = require('./rotate');

const calcHeight = function (tree) {
  if (!tree) return 0;
  return 1 + Math.max(calcHeight(tree.left), calcHeight(tree.right));
};

const isBalanced = function (tree) {
  if (tree == null) return true;
  const leftHeight = calcHeight(tree.left);
  const rightHeight = calcHeight(tree.right);
  return Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(tree.left) && isBalanced(tree.right);
};

const balanceTree = function (nodeToBeRoot, tree) {
  if (tree.value === nodeToBeRoot) {
    return tree;
  }
  if (tree.left && tree.left.value === nodeToBeRoot) {
    return rotate(tree, tree.left);
  }
  if (tree.right && tree.right.value === nodeToBeRoot) {
    return rotate(tree, tree.right);
  }
  if (nodeToBeRoot < tree.value) {
    tree.left = balanceTree(nodeToBeRoot, tree.left);
  } else {
    tree.right = balanceTree(nodeToBeRoot, tree.right);
  }
  return balanceTree(nodeToBeRoot, tree);
};

const balance = function (tree) {
  if (isBalanced(tree)) {
    return tree;
  }
  const nodes = [];
  visitInOrder(tree, nodes.push.bind(nodes));
  const nodeToBeRoot = nodes[Math.ceil(nodes.length / 2) - 1];
  tree = balanceTree(nodeToBeRoot, tree);
  tree.left = balance(tree.left);
  tree.right = balance(tree.right);
  return tree;
};

module.exports = {balance};
