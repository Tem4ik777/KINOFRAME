const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { nextMenuState } = require('../js/script.js');

const source = readFileSync(join(__dirname, '../js/script.js'), 'utf8');
const start = source.indexOf('function nextMenuState(');
const end = source.indexOf('\n}', start);
assert.ok(start >= 0 && end > start);
const lines = source.slice(start, end + 2).split('\n');
const decisions = lines.filter(line => /^\s*if\s*\(/.test(line)).length;

console.log('js/script.js / nextMenuState\n');
lines.forEach((line, index) => console.log(String(index + 1).padStart(2), line));
console.log('\nPhysical lines (including braces):', lines.length);
console.log('Parameters:', nextMenuState.length);
console.log('Decision points (if):', decisions);
console.log('Cyclomatic complexity (1 + decisions):', 1 + decisions);
console.log('Maximum control nesting (manual inspection): 1');
