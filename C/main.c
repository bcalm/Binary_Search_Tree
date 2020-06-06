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
  int values[] = {4, 3, 5, 2, 6, 1, 7};
  Tree_ptr tree = reduce(NULL, values, 7);
  print_pre_order(tree);
  tree = balance_by_creating_new_tree(tree);
  print_pre_order(tree);
  return 0;
}