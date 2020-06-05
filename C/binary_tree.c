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

Tree_ptr rotate(Tree_ptr tree, Tree_ptr pivot){
  Tree_ptr root = tree;
  if(tree->right == pivot){
    root->right = pivot->left;
    pivot->left = root;
  }
  if(tree->left== pivot){
    root->left = pivot->right;
    pivot->right = root;  
  }
  return pivot;
}
