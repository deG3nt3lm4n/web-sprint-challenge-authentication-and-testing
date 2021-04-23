const superTest = require('supertest')
const server = require('./server');
const db = require('../data/dbConfig');

test('sanity', () => {
  expect(true).toBe(true)
})
