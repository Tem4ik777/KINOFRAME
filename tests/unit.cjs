const test = require('node:test');
const assert = require('node:assert/strict');
const { nextMenuState } = require('../js/script.js');

test('toggle opens a closed menu', () => assert.equal(nextMenuState(false, 'toggle'), true));
test('toggle closes an open menu', () => assert.equal(nextMenuState(true, 'toggle'), false));
test('close closes an open menu', () => assert.equal(nextMenuState(true, 'close'), false));
test('close leaves a closed menu closed', () => assert.equal(nextMenuState(false, 'close'), false));
