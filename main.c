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
  int values[] = {10, 20, 5, 8, 1};
  Tree_ptr tree = reduce(NULL, values, 5);
  print_in_order(tree);
  printf("\n-----------------\n");
  tree = left_rotate(tree);
  print_in_order(tree);
  printf("\n-----------------\n");
  return 0;
}