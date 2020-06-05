const assert = require('assert');
const {insert} = require('../src/insert');

describe('# insert', () => {
  it('should insert in the list when list is null', () => {
    const actual = insert(null, 5);
    const expected = {
      value: 5,
      left: null,
      right: null,
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should insert into the left child when value is less then root node', () => {
    const tree = insert(null, 10);
    const actual = insert(tree, 8);
    const expected = {
      value: 10,
      left: {
        value: 8,
        left: null,
        right: null,
      },
      right: null,
    };
    assert.deepStrictEqual(actual, expected);
  });

  it('should insert into the right when value is greater than root node', () => {
    const tree = insert(null, 10);
    const actual = insert(tree, 15);
    const expected = {
      value: 10,
      left: null,
      right: {
        value: 15,
        left: null,
        right: null,
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should insert to the left of left child when value is lesser than root and left value is not null', () => {
    const values = [10, 5];
    const tree = values.reduce(insert, null);
    const actual = insert(tree, 1);
    const expected = {
      value: 10,
      left: {
        value: 5,
        left: {value: 1, left: null, right: null},
        right: null,
      },
      right: null,
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should insert to the right of left child when value is lesser than root and left value is not null', () => {
    const values = [10, 5];
    const tree = values.reduce(insert, null);
    const actual = insert(tree, 8);
    const expected = {
      value: 10,
      left: {
        value: 5,
        left: null,
        right: {value: 8, left: null, right: null},
      },
      right: null,
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should insert to the left of right child when value is greater than root and right value is not null', () => {
    const values = [10, 15];
    const tree = values.reduce(insert, null);
    const actual = insert(tree, 12);
    const expected = {
      value: 10,
      right: {
        value: 15,
        right: null,
        left: {value: 12, left: null, right: null},
      },
      left: null,
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should insert to the right of right child when value is greater than root and right value is not null', () => {
    const values = [10, 15];
    const tree = values.reduce(insert, null);
    const actual = insert(tree, 20);
    const expected = {
      value: 10,
      right: {
        value: 15,
        left: null,
        right: {value: 20, left: null, right: null},
      },
      left: null,
    };
    assert.deepStrictEqual(actual, expected);
  });
});
