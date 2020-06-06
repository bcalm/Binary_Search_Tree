const {visitInOrder} = require('./traversal');
const {rotate} = require('./rotate');
const {insert} = require('./insert');

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

// const main = function () {
//   const values = [10, 5, 1, 8, 9, 20];
//   const tree = values.reduce(insert, null);
//   const newTree = balanceByCreatingNewTree(tree);
//   console.log(newTree);
// };

// main();
module.exports = {balance, balanceByCreatingNewTree};
