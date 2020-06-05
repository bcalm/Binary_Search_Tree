const assert = require('assert');
const {visitInOrder} = require('../src/traversal');
const {insert} = require('../src/insert');
const {deleteNode} = require('../src/delete');

describe('# Delete', () => {
  it('should delete the leaf node', () => {
    const values = [10, 20, 15, 25, 5, 8, 1];
    let tree = values.reduce(insert, null);
    tree = deleteNode(tree, 1);
    const actual = [];
    visitInOrder(tree, actual.push.bind(actual));
    const expected = [5, 8, 10, 15, 20, 25];
    assert.deepStrictEqual(actual, expected);
  });
  it('should delete a sub tree when sub tree has no left child', () => {
    const values = [10, 20, 25, 5, 8, 1];
    let tree = values.reduce(insert, null);
    tree = deleteNode(tree, 20);
    const actual = [];
    visitInOrder(tree, actual.push.bind(actual));
    const expected = [1, 5, 8, 10, 25];
    assert.deepStrictEqual(actual, expected);
  });
  it('should delete a sub tree when sub tree has no right child', () => {
    const values = [10, 20, 15, 25, 5, 1];
    let tree = values.reduce(insert, null);
    tree = deleteNode(tree, 5);
    const actual = [];
    visitInOrder(tree, actual.push.bind(actual));
    const expected = [1, 10, 15, 20, 25];
    assert.deepStrictEqual(actual, expected);
  });
  it('should delete a sub tree when sub tree has both child', () => {
    const values = [10, 20, 15, 25, 5, 8, 1];
    let tree = values.reduce(insert, null);
    tree = deleteNode(tree, 5);
    const actual = [];
    visitInOrder(tree, actual.push.bind(actual));
    const expected = [1, 8, 10, 15, 20, 25];
    assert.deepStrictEqual(actual, expected);
  });
  it('should delete the root of the tree', () => {
    const values = [10, 20, 15, 25, 5, 8, 1];
    let tree = values.reduce(insert, null);
    tree = deleteNode(tree, 10);
    const actual = [];
    visitInOrder(tree, actual.push.bind(actual));
    const expected = [1, 5, 8, 15, 20, 25];
    assert.deepStrictEqual(actual, expected);
  });
  it('should delete when tree has only one element', () => {
    let tree = insert(null, 10);
    tree = deleteNode(tree, 10);
    const actual = [];
    visitInOrder(tree, actual.push.bind(actual));
    assert.deepEqual(actual, []);
  });
  it('should not delete when tree is null', () => {
    const tree = deleteNode(null, 10);
    const actual = [];
    visitInOrder(tree, actual.push.bind(actual));
    assert.deepEqual(actual, []);
  });
});
