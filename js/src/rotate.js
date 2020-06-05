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

module.exports = {rotate};
