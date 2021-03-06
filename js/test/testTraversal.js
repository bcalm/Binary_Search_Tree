const assert = require('assert');
const {visitInOrder, visitPreOrder, visitPostOrder, search} = require('../src/traversal');
const {insert} = require('../src/insert');

describe('# Traverse', () => {
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
  describe('## search', () => {
    it('should give true if number is present in the list', () => {
      const values = [10, 20, 15, 25, 5, 8, 1];
      const tree = values.reduce(insert, null);
      const actual = search(tree, 1);
      assert.equal(actual, true);
    });

    it('should give false if number is present in the list', () => {
      const values = [10, 20, 15, 25, 5, 8, 1];
      const tree = values.reduce(insert, null);
      const actual = search(tree, 12);
      assert.equal(actual, false);
    });
  });
});
