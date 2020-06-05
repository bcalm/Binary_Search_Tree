#ifndef __BINARY_TREE_H__
#define __BINARY_TREE_H__

#include<stdio.h>
#include<stdlib.h>
#include <math.h>

typedef enum{
  False,
  True
}Boolean;

typedef int * Int_ptr;

typedef struct tree {
  int value;
  struct tree *left;
  struct tree *right;
} Tree;

typedef Tree* Tree_ptr;
typedef Tree_ptr* Tree_ptr_to_ptr;
Tree_ptr insert(Tree_ptr, int);
Tree_ptr delete_node(Tree_ptr, int);
Boolean search(Tree_ptr, int);
Boolean is_balanced(Tree_ptr);
void print_in_order(Tree_ptr);
void print_pre_order(Tree_ptr);
void print_post_order(Tree_ptr);
Tree_ptr find_min(Tree_ptr);
Tree_ptr rotate(Tree_ptr, int);
#endif
