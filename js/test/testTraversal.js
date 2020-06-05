const assert = require('assert');
const {visitInOrder, visitPreOrder, visitPostOrder} = require('../src/traversal');
const {insert} = require('../src/insert');

describe('# balance', () => {
  describe('## visitInOrder', () => {
    it('should give all the nodes in ascending order', () => {
      const values = [10, 20, 15, 25, 5, 8, 1];
      const tree = values.reduce(insert, null);
      const actual = [];
      visitInOrder(tree, actual.push.bind(actual));
      const expected = [1, 5, 8, 10, 15, 20, 25];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('## visitPreOrder', () => {
    it('should give all the nodes in pre order', () => {
      const values = [10, 20, 15, 25, 5, 8, 1];
      const tree = values.reduce(insert, null);
      const actual = [];
      visitPreOrder(tree, actual.push.bind(actual));
      const expected = [10, 5, 1, 8, 20, 15, 25];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('## visitPostOrder', () => {
    it('should give all the nodes in post order', () => {
      const values = [10, 20, 15, 25, 5, 8, 1];
      const tree = values.reduce(insert, null);
      const actual = [];
      visitPostOrder(tree, actual.push.bind(actual));
      const expected = [1, 8, 5, 15, 25, 20, 10];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
