const {insert} = require('./insert');

const leftRotate = function (tree) {
  if (!tree || !tree.right) {
    return tree;
  }
  const pivot = tree.right;
  tree.right = pivot.left;
  pivot.left = tree;
  return pivot;
};

const rightRotate = function (tree) {
  if (!tree || !tree.left) {
    return tree;
  }
  const pivot = tree.left;
  tree.left = pivot.right;
  pivot.right = tree;
  return pivot;
};

const rotate = function (tree, pivot) {
  if (tree.right == pivot) {
    tree = leftRotate(tree);
  }
  if (tree.left == pivot) {
    tree = rightRotate(tree);
  }
  return tree;
};

const rotateByValue = function (tree, value) {
  let grandParent = null;
  let parent = null;
  let current = tree;
  while (current && current.value !== value) {
    grandParent = parent;
    parent = current;
    current = value < current.value ? current.left : current.right;
  }

  if (current === null) {
    return tree;
  }

  if (grandParent === null) {
    return rotate(parent, current);
  }

  if (grandParent.left === parent) {
    grandParent.left = rotate(parent, current);
  } else {
    grandParent.right = rotate(parent, current);
  }
  return tree;
};

module.exports = {rotate, rotateByValue};
