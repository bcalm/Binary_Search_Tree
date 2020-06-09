#include "avl_tree.h"

AVL_TREE_PTR createNode(int value) {
   AVL_TREE_PTR  tree = (AVL_TREE_PTR) malloc(sizeof(AVL_TREE));
  tree->value = value;
  tree->left = NULL;
  tree->right = NULL;
  tree->height = 1;
  return tree;
};

int __height(AVL_TREE_PTR node) {
  if (!node) {
    return 0;
  }
  return node->height;
};

int __max(int num1, int num2){
  return num1 > num2 ? num1 : num2;
}

AVL_TREE_PTR leftRotate(AVL_TREE_PTR tree) {
  if (!tree || !tree->right) {
    return tree;
  }
  AVL_TREE_PTR pivot = tree->right;
  tree->right = pivot->left;
  pivot->left = tree;

  tree->height = __max(__height(tree->left), __height(tree->right)) + 1;
  pivot->height = __max(__height(pivot->left), __height(pivot->right)) + 1;
  return pivot;
};

AVL_TREE_PTR rightRotate(AVL_TREE_PTR tree) {
  if (!tree || !tree->left) {
    return tree;
  }
  AVL_TREE_PTR pivot = tree->left;
  tree->left = pivot->right;
  pivot->right = tree;

  tree->height = __max(__height(tree->left), __height(tree->right)) + 1;
  pivot->height = __max(__height(pivot->left), __height(pivot->right)) + 1;
  return pivot;
};

int getHeightDiff(AVL_TREE_PTR tree) {
  if (!tree) {
    return 0;
  }
  return __height(tree->left) - __height(tree->right);
};

AVL_TREE_PTR insert_avl(AVL_TREE_PTR tree, int value) {
  AVL_TREE_PTR newNode = createNode(value);
  if (!tree) {
    return newNode;
  }
  if (value < tree->value) {
    tree->left = insert_avl(tree->left, value);
  } else {
    tree->right = insert_avl(tree->right, value);
  }

  tree->height = __max(__height(tree->left), __height(tree->right)) + 1;
  int heightDiff = getHeightDiff(tree);

  if (heightDiff < -1 && value > tree->right->value) {
    return leftRotate(tree);
  }

  if (heightDiff > 1 && value < tree->left->value) {
    return rightRotate(tree);
  }

  if (heightDiff > 1 && value > tree->left->value) {
    tree->left = leftRotate(tree->left);
    return rightRotate(tree);
  }

  if (heightDiff < -1 && value < tree->right->value) {
    tree->right = rightRotate(tree->right);
    return leftRotate(tree);
  }
  return tree;
};

AVL_TREE_PTR __find_min(AVL_TREE_PTR tree) {
  if (tree->left == NULL) {
    return tree;
  }
  return __find_min(tree->left);
};

AVL_TREE_PTR deleteNode(AVL_TREE_PTR tree,int value) {
  if (tree == NULL) return tree;

  if (value < tree->value) tree->left = deleteNode(tree->left, value);
  else if (value > tree->value) tree->right = deleteNode(tree->right, value);
  else {
    if (tree->left == NULL) return tree->right;
    if (tree->right == NULL) return tree->left;
    AVL_TREE_PTR minNode = __find_min(tree->right);
    tree->value = minNode->value;
    tree->right = deleteNode(tree->right, minNode->value);
  }

  tree->height = 1 + __max(__height(tree->left), __height(tree->right));

  int heightDiff = getHeightDiff(tree);
  if (heightDiff > 1 && getHeightDiff(tree->left) >= 0) {
    return rightRotate(tree);
  }

  if (heightDiff > 1 && getHeightDiff(tree->left) < 0) {
    tree->left = leftRotate(tree->left);
    return rightRotate(tree);
  }

  if (heightDiff < -1 && getHeightDiff(tree->right) <= 0) {
    return leftRotate(tree);
  }

  if (heightDiff < -1 && getHeightDiff(tree->right) > 0) {
    tree->right = rightRotate(tree->right);
    return leftRotate(tree);
  }
  return tree;
};
