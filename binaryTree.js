const createNode = (value) => {
  return {value, left: null, right: null};
};

const insert = (tree, value) => {
  if (tree == null) {
    return createNode(value);
  }
  if (value < tree.value) {
    tree.left = insert(tree.left, value);
  } else {
    tree.right = insert(tree.right, value);
  }
  return tree;
};

const printInOrder = (tree) => {
  if (tree == null) {
    return;
  }
  printInOrder(tree.left);
  console.log(tree.value);
  printInOrder(tree.right);
};

const printPreOrder = (tree) => {
  if (tree == null) {
    return;
  }
  console.log(tree.value);
  printPreOrder(tree.left);
  printPreOrder(tree.right);
};

const printPostOrder = (tree) => {
  if (tree == null) {
    return;
  }
  printPostOrder(tree.left);
  printPostOrder(tree.right);
  console.log(tree.value);
};

const search = function (tree, value) {
  if (tree == null) {
    return false;
  }
  if (tree.value == value) {
    return true;
  }
  const remainingTree = tree.value > value ? tree.left : tree.right;
  return search(remainingTree, value);
};

const iterativePrintInOrder = function (tree) {
  let curr = tree;
  const stack = [];
  while (true) {
    while (curr != null) {
      stack.push(curr);
      curr = curr.left;
    }

    if (!stack.length) break;
    curr = stack.pop();
    console.log(curr.value);
    curr = curr.right;
  }
};

const iterativePrintPreOrder = function (tree) {
  let curr = tree;
  const stack = [];
  stack.push(curr);
  while (stack.length) {
    curr = stack.pop();
    console.log(curr.value);
    if (curr.right) {
      stack.push(curr.right);
    }
    if (curr.left) {
      stack.push(curr.left);
    }
  }
};

const iterativePrintPostOrder = function (tree) {
  if (tree == null) return;
  const stack = [];
  do {
    while (tree) {
      if (tree.right) {
        stack.push(tree.right);
      }
      stack.push(tree);
      tree = tree.left;
    }
    tree = stack.pop();
    if (tree.right && stack[stack.length - 1] == tree.right) {
      stack.pop();
      stack.push(tree);
      tree = tree.right;
    } else {
      console.log(tree.value);
      tree = null;
    }
  } while (stack.length);
};

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

const main = function () {
  const values = [10, 20, 5, 8, 1, 15, 25];
  let tree = values.reduce(insert, null);
  printPreOrder(tree);
  tree = deleteNode(tree, 10);
  console.log('-');
  printPreOrder(tree);
};

main();
