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
  int values[] = {15, 25, 35};
  Tree_ptr tree = reduce(NULL, values, 3);
  print_in_order(tree);
  printf("\n-----------------\n");
  tree  = delete_node(tree, 45);
  print_in_order(tree);
  return 0;
}