const assert = require('assert');
const {
  balance,
  deleteNode,
  insert,
  visitInOrder,
  visitPreOrder,
  visitPostOrder,
  rotate,
} = require('../binaryTree');

describe('# balance', () => {
  it('should return the original tree if tree is already balanced', () => {
    const values = [10, 20, 15, 25, 5, 8, 1];
    const tree = values.reduce(insert, null);
    const actual = balance(tree);
    const expected = {
      value: 10,
      left: {
        value: 5,
        left: {value: 1, left: null, right: null},
        right: {value: 8, left: null, right: null},
      },
      right: {
        value: 20,
        left: {value: 15, left: null, right: null},
        right: {value: 25, left: null, right: null},
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should balanced the tree when is in ascending order', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const tree = values.reduce(insert, null);
    const actual = balance(tree);
    const expected = {
      value: 5,
      left: {
        value: 2,
        left: {value: 1, left: null, right: null},
        right: {value: 3, left: null, right: {value: 4, left: null, right: null}},
      },
      right: {
        value: 7,
        left: {value: 6, left: null, right: null},
        right: {value: 8, left: null, right: {value: 9, left: null, right: null}},
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  it('should balanced the tree when is in descending order', () => {
    const values = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    const tree = values.reduce(insert, null);
    const actual = balance(tree);
    const expected = {
      value: 5,
      left: {
        value: 2,
        left: {value: 1, left: null, right: null},
        right: {value: 4, right: null, left: {value: 3, left: null, right: null}},
      },
      right: {
        value: 7,
        left: {value: 6, left: null, right: null},
        right: {value: 9, right: null, left: {value: 8, left: null, right: null}},
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should balanced the tree when sub tree are balanced', () => {
    const values = [4, 3, 2, 1, 5, 6, 7];
    const tree = values.reduce(insert, null);
    const actual = balance(tree);
    const expected = {
      value: 4,
      left: {
        value: 2,
        left: {value: 1, left: null, right: null},
        right: {value: 3, right: null, left: null},
      },
      right: {
        value: 6,
        left: {value: 5, left: null, right: null},
        right: {value: 7, right: null, left: null},
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should balanced the tree when elements are randomly unbalanced', () => {
    const values = [10, 5, 1, 8, 9, 20];
    const tree = values.reduce(insert, null);
    const actual = balance(tree);
    const expected = {
      value: 8,
      left: {
        value: 5,
        left: {value: 1, left: null, right: null},
        right: null,
      },
      right: {
        value: 10,
        left: {value: 9, left: null, right: null},
        right: {value: 20, right: null, left: null},
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
});
