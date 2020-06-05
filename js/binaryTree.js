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

const visitInOrder = function (tree, visiter) {
  let curr = tree;
  const stack = [];
  while (true) {
    while (curr != null) {
      stack.push(curr);
      curr = curr.left;
    }

    if (!stack.length) break;
    curr = stack.pop();
    visiter(curr.value);
    curr = curr.right;
  }
};

const visitPreOrder = function (tree, visiter) {
  let curr = tree;
  const stack = [];
  stack.push(curr);
  while (stack.length) {
    curr = stack.pop();
    visiter(curr.value);
    if (curr.right) {
      stack.push(curr.right);
    }
    if (curr.left) {
      stack.push(curr.left);
    }
  }
};

const visitPostOrder = function (tree, visiter) {
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
      visiter(tree.value);
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

module.exports = {
  balance,
  deleteNode,
  insert,
  visitInOrder,
  visitPreOrder,
  visitPostOrder,
  rotate,
};
