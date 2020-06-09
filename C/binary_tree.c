#include "binary_tree.h"

Tree_ptr create_tree(int value){
  Tree_ptr tree = (Tree_ptr) malloc(sizeof(Tree));
  tree->value = value;
  tree->left = NULL;
  tree->right = NULL;
  return tree;
}

void print_in_order(Tree_ptr tree) {
  if (tree == NULL) {
    return;
  }
  print_in_order(tree->left);
  printf("%d  ",tree->value);
  print_in_order(tree->right);
};

void print_pre_order(Tree_ptr tree){
  if (tree == NULL) {
    return;
  }
  printf("%d  ",tree->value);
  print_pre_order(tree->left);
  print_pre_order(tree->right);
};

void print_post_order(Tree_ptr tree){
  if (tree == NULL) {
    return;
  }
  print_post_order(tree->left);
  print_post_order(tree->right);
  printf("%d  ",tree->value);
};

Tree_ptr insert(Tree_ptr tree, int value) {
  Tree_ptr_to_ptr current = &tree;
  Tree_ptr temp_node = create_tree(value);

  while(*current != NULL){
    if (value < (*current)->value)
    {
      current = &((*current)->left);
    }else{
      current = &((*current)->right);
    }
  } 
  (*current) = temp_node;
  return tree;
}

Boolean search(Tree_ptr tree, int value){
  Tree_ptr current = tree;
  while(current != NULL){
    if(value == current->value){
      return True;
    }
    current = value < current -> value ? current->left : current->right;
  }
  return False;
}

Tree_ptr find_min(Tree_ptr node)
{ 
  Tree_ptr current = node; 
  while (current->left != NULL) 
    current = current->left; 
  return current; 
} 

Tree_ptr delete_node(Tree_ptr tree, int value)
{
  Tree_ptr_to_ptr current = &tree;
  while (*current && (*current)->value != value)
  {
    current = value < (*current)->value ? &((*current)->left): &((*current)->right);
  } 
  if(*current == NULL)
  { 
    return tree;
  }

  if((*current)->left == NULL)
  {
    (*current) = (*current)->right;
  } else if ((*current)->right == NULL)
  {
    (*current) = (*current)->left;
  } else
  {
    Tree_ptr_to_ptr child = &((*current)->right);
    while ((*child)->left != NULL) { 
      child = &((*child)->left); 
    } 
    (*current)->value = (*child)->value;
    Tree_ptr node_to_delete = *child;
    *child = (*child)->right;
    free(node_to_delete);
  }
  return tree;
}
Tree_ptr left_rotate(Tree_ptr tree) {
  if (!tree || !tree->right) {
    return tree;
  }
  Tree_ptr pivot = tree->right;
  tree->right = pivot->left;
  pivot->left = tree;
  return pivot;
};

Tree_ptr right_rotate(Tree_ptr tree) {
  if (!tree || !tree->left) {
    return tree;
  }
  Tree_ptr pivot = tree->left;
  tree->left = pivot->right;
  pivot->right = tree;
  return pivot;
};

Tree_ptr rotate(Tree_ptr tree, Tree_ptr pivot){
  if(tree == NULL) return tree;
  if(tree->right == pivot){
    tree = left_rotate(tree);
  }
  if(tree->left == pivot){
    tree = right_rotate(tree);
  }
  return tree;
}

int max(int num1, int num2){
  return num1 < num2 ? num2: num1;
}

int calc_height(Tree_ptr tree){
  if(tree == NULL) return 0;
  return 1 + max(calc_height(tree->left), calc_height(tree->right));
}

Boolean is_balanced(Tree_ptr tree){
  if(tree==NULL) return True;
  int left_height = calc_height(tree->left);
  int right_height = calc_height(tree->right);
  return abs(left_height - right_height) <= 1 && is_balanced(tree->left) && is_balanced(tree->right);
}

int store_nodes(Tree_ptr tree, Int_ptr nodes, int no_of_nodes){
  if (tree == NULL)
  {
    return no_of_nodes;
  }
  no_of_nodes = store_nodes(tree->left, nodes, no_of_nodes);
  nodes[no_of_nodes++] = tree->value;
  no_of_nodes = store_nodes(tree->right, nodes, no_of_nodes);
  return no_of_nodes;
}



Tree_ptr balance(Tree_ptr tree) {
  if (is_balanced(tree)) {
    return tree;
  }
  int nodes[100];
  int no_of_nodes =  store_nodes(tree, nodes, 0);
  int node_to_be_root = nodes[(no_of_nodes / 2) - 1];
  while (tree->value != node_to_be_root) {
    tree = rotate_by_value(tree, node_to_be_root);
  }
  tree->left = balance(tree->left);
  tree->right = balance(tree->right);
  return tree;
};

Tree_ptr build_balanced_tree(Int_ptr nodes,int start,int end) {
  if (start > end) {
    return NULL;
  }
  int mid = floor((start + end) / 2);
  Tree_ptr tree = (Tree_ptr)malloc(sizeof(Tree));
  tree->value = nodes[mid];
  tree->left = build_balanced_tree(nodes, start, mid - 1);
  tree->right = build_balanced_tree(nodes, mid + 1, end);
  return tree;
};


Tree_ptr balance_by_creating_new_tree(Tree_ptr tree) {
  int nodes[100];
  int nodes_count = store_nodes(tree,nodes,0);
  return build_balanced_tree(nodes, 0, nodes_count - 1);
};

Tree_ptr rotate_by_value(Tree_ptr tree, int value)
{
 
  Tree_ptr_to_ptr parent = NULL;
  Tree_ptr_to_ptr node = &tree;
  while (*node && value != (*node)->value)
  {
    parent = &(*node);
    node = value < (*node)->value ? &(*node)->left : &(*node)->right;
  }
  if (*node == NULL)
  {
    return tree;
  }
  if (*parent)
  {
    *parent = rotate(*parent, (*node));
  }
  return tree;
};


