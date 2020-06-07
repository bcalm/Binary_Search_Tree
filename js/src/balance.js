const {visitInOrder} = require('./traversal');
const {rotateByValue} = require('./rotate');

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

const balance = function (tree) {
  if (isBalanced(tree)) {
    return tree;
  }
  const nodes = [];
  visitInOrder(tree, nodes.push.bind(nodes));
  const nodeToBeRoot = nodes[Math.ceil(nodes.length / 2) - 1];

  while (tree.value !== nodeToBeRoot) {
    tree = rotateByValue(tree, nodeToBeRoot);
  }

  tree.left = balance(tree.left);
  tree.right = balance(tree.right);
  return tree;
};

const buildBalancedTree = function (nodes, start, end) {
  if (start > end) {
    return null;
  }
  const mid = Math.floor((start + end) / 2);
  const node = {value: nodes[mid]};
  node.left = buildBalancedTree(nodes, start, mid - 1);
  node.right = buildBalancedTree(nodes, mid + 1, end);
  return node;
};

const balanceByCreatingNewTree = function (tree) {
  const nodes = [];
  visitInOrder(tree, nodes.push.bind(nodes));
  return buildBalancedTree(nodes, 0, nodes.length - 1);
};

module.exports = {balance, balanceByCreatingNewTree};
