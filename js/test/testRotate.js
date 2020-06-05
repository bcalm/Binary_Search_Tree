const assert = require('assert');
const {insert} = require('../src/insert');
const {rotate} = require('../src/rotate');

describe('# Rotate', () => {
  it('should rotate to the left', () => {
    const values = [10, 20, 15, 25, 5, 8, 1];
    let tree = values.reduce(insert, null);
    const actual = rotate(tree, tree.left);
    const expected = {
      value: 5,
      left: {value: 1, left: null, right: null},
      right: {
        value: 10,
        left: {value: 8, left: null, right: null},
        right: {
          value: 20,
          left: {value: 15, left: null, right: null},
          right: {value: 25, left: null, right: null},
        },
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should rotate to the right', () => {
    const values = [10, 20, 15, 25, 5, 8, 1];
    let tree = values.reduce(insert, null);
    const actual = rotate(tree, tree.right);
    const expected = {
      value: 20,
      left: {
        value: 10,
        left: {
          value: 5,
          left: {value: 1, left: null, right: null},
          right: {value: 8, left: null, right: null},
        },
        right: {value: 15, left: null, right: null},
      },
      right: {value: 25, left: null, right: null},
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should not rotate left when left child is null', () => {
    let tree = insert(null, 10);
    tree = insert(null, 14);
    const actual = rotate(tree, tree.left);
    const expected = tree;
    assert.equal(actual, expected);
  });
  it('should not rotate right when right child is null', () => {
    let tree = insert(null, 10);
    tree = insert(null, 4);
    const actual = rotate(tree, tree.right);
    const expected = tree;
    assert.equal(actual, expected);
  });
});
