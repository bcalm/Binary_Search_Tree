const createNode = function (value) {
  return {value, left: null, right: null, height: 1};
};

const height = function (node) {
  if (!node) {
    return 0;
  }
  return node.height;
};

const leftRotate = function (tree) {
  if (!tree || !tree.right) {
    return tree;
  }
  const pivot = tree.right;
  tree.right = pivot.left;
  pivot.left = tree;

  tree.height = Math.max(height(tree.left), height(tree.right)) + 1;
  pivot.height = Math.max(height(pivot.left), height(pivot.right)) + 1;
  return pivot;
};

const rightRotate = function (tree) {
  if (!tree || !tree.left) {
    return tree;
  }
  const pivot = tree.left;
  tree.left = pivot.right;
  pivot.right = tree;

  tree.height = Math.max(height(tree.left), height(tree.right)) + 1;
  pivot.height = Math.max(height(pivot.left), height(pivot.right)) + 1;
  return pivot;
};

const getHeightDiff = function (tree) {
  if (!tree) {
    return 0;
  }
  return height(tree.left) - height(tree.right);
};

const insert = function (tree, value) {
  const newNode = createNode(value);
  if (!tree) {
    return newNode;
  }
  if (value < tree.value) {
    tree.left = insert(tree.left, value);
  } else {
    tree.right = insert(tree.right, value);
  }

  tree.height = Math.max(height(tree.left), height(tree.right)) + 1;
  const heightDiff = getHeightDiff(tree);

  if (heightDiff < -1 && value > tree.right.value) {
    return leftRotate(tree);
  }

  if (heightDiff > 1 && value < tree.left.value) {
    return rightRotate(tree);
  }

  if (heightDiff > 1 && value > tree.left.value) {
    tree.left = leftRotate(tree.left);
    return rightRotate(tree);
  }

  if (heightDiff < -1 && value < tree.right.value) {
    tree.right = rightRotate(tree.right);
    return leftRotate(tree);
  }
  return tree;
};

const find_min = function (tree) {
  if (tree.left === null) {
    return tree;
  }
  return find_min(tree.left);
};

const deleteNode = function (tree, value) {
  if (tree == null) return tree;

  if (value < tree.value) tree.left = deleteNode(tree.left, value);
  else if (value > tree.value) tree.right = deleteNode(tree.right, value);
  else {
    if (tree.left == null) return tree.right;
    if (tree.right == null) return tree.left;
    const minNode = find_min(tree.right);
    tree.value = minNode.value;
    tree.right = deleteNode(tree.right, minNode.value);
  }

  tree.height = 1 + Math.max(height(tree.left), height(tree.right));

  const heightDiff = getHeightDiff(tree);
  if (heightDiff > 1 && getHeightDiff(tree.left) >= 0) {
    return rightRotate(tree);
  }

  if (heightDiff > 1 && getHeightDiff(tree.left) < 0) {
    tree.left = leftRotate(tree.left);
    return rightRotate(tree);
  }

  if (heightDiff < -1 && getHeightDiff(tree.right) <= 0) {
    return leftRotate(tree);
  }

  if (heightDiff < -1 && getHeightDiff(tree.right) > 0) {
    tree.right = rightRotate(tree.right);
    return leftRotate(tree);
  }
  return tree;
};

const main = function () {
  const values = [15, 25, 20, 8, 1, 5, 10];
  let tree = values.reduce(insert, null);
  console.log(JSON.stringify(tree));
  return 0;
};

main();
