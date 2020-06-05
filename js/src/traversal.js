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

module.exports = {visitInOrder, visitPreOrder, visitPostOrder, search};
