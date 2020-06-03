#include "binary_tree.h"

Tree_ptr reduce(Tree_ptr tree, Int_ptr array, int array_length){
  for (size_t i = 0; i < array_length; i++)
  {
    tree = insert(tree, array[i]);
  }
  return tree;
}

int main(void)
{
  int values[] = {10, 20, 5, 8, 1, 15, 25};
  Tree_ptr tree = reduce(NULL, values, 7);
  print_in_order(tree);
  printf("\n-----------------\n");
  tree = delete_node(tree, 10);
  print_in_order(tree);
  printf("\n-----------------\n");
  tree = delete_node(tree, 20);
  print_in_order(tree);
  printf("\n-----------------\n");
  tree = delete_node(tree, 5);
  print_in_order(tree);
  printf("\n-----------------\n");
  tree = delete_node(tree, 8);
  print_in_order(tree);
  printf("\n-----------------\n");
  tree = delete_node(tree, 1);
  print_in_order(tree);
  printf("\n-----------------\n");
  tree = delete_node(tree, 15);
  print_in_order(tree);
  printf("\n-----------------\n");
  tree = delete_node(tree, 25);
  print_in_order(tree);
  printf("\n-----------------\n");
  return 0;
}