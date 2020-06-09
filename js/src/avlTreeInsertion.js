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
  return Math.abs(height(tree.left) - height(tree.right));
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

const main = function () {
  const values = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  const tree = values.reduce(insert, null);
  console.log(JSON.stringify(tree));
  return 0;
};

main();
