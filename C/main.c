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
  int values[] = {10,15,20,25,5, 8, 1};
  Tree_ptr tree = reduce(NULL, values, 7);
  return 0;
}