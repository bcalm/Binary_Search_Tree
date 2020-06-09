#ifndef __AVL_TREE_H__
#define __AVL_TREE_H__

#include<stdio.h>
#include<stdlib.h>
#include <math.h>

typedef struct node
{ 
    int value; 
    struct node *left; 
    struct node *right; 
    int height; 
} AVL_TREE; 
  
typedef AVL_TREE * AVL_TREE_PTR;
AVL_TREE_PTR insert_avl(AVL_TREE_PTR tree, int value); 
AVL_TREE_PTR deleteNode(AVL_TREE_PTR , int ); 

#endif