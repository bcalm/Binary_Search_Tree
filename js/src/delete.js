const find_min = function (tree) {
  if (tree.left === null) {
    return tree;
  }
  return find_min(tree.left);
};

const deleteNode = function (tree, value) {
  if (tree == null) {
    return tree;
  }
  if (value < tree.value) {
    tree.left = deleteNode(tree.left, value);
    return tree;
  }
  if (value > tree.value) {
    tree.right = deleteNode(tree.right, value);
    return tree;
  }
  if (tree.left == null) {
    return tree.right;
  }
  if (tree.right == null) {
    return tree.left;
  }
  const minNode = find_min(tree.right);
  tree.value = minNode.value;
  tree.right = deleteNode(tree.right, minNode.value);
  return tree;
};

module.exports = {deleteNode};
