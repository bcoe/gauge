'use strict'
const t = require('tap')
const wideTruncate = require('../lib/wide-truncate.js')

t.test('wideTruncate', function (t) {
  let result

  result = wideTruncate('abc', 6)
  t.equal(result, 'abc', 'narrow, no truncation')
  result = wideTruncate('古古古', 6)
  t.equal(result, '古古古', 'wide, no truncation')
  result = wideTruncate('abc', 2)
  t.equal(result, 'ab', 'narrow, truncation')
  result = wideTruncate('古古古', 2)
  t.equal(result, '古', 'wide, truncation')
  result = wideTruncate('古古', 3)
  t.equal(result, '古', 'wide, truncation, partial')
  result = wideTruncate('古', 1)
  t.equal(result, '', 'wide, truncation, no chars fit')
  result = wideTruncate('abc', 0)
  t.equal(result, '', 'zero truncation is empty')
  result = wideTruncate('', 10)
  t.equal(result, '', 'empty string')

  result = wideTruncate('abc古古古def', 12)
  t.equal(result, 'abc古古古def', 'mixed nwn, no truncation')
  result = wideTruncate('abcdef古古古', 12)
  t.equal(result, 'abcdef古古古', 'mixed nw, no truncation')
  result = wideTruncate('古古古abcdef', 12)
  t.equal(result, '古古古abcdef', 'mixed wn, no truncation')
  result = wideTruncate('古古abcdef古', 12)
  t.equal(result, '古古abcdef古', 'mixed wnw, no truncation')

  result = wideTruncate('abc古古古def', 6)
  t.equal(result, 'abc古', 'mixed nwn, truncation')
  result = wideTruncate('abcdef古古古', 6)
  t.equal(result, 'abcdef', 'mixed nw, truncation')
  result = wideTruncate('古古古abcdef', 6)
  t.equal(result, '古古古', 'mixed wn, truncation')
  result = wideTruncate('古古abcdef古', 6)
  t.equal(result, '古古ab', 'mixed wnw, truncation')
  result = wideTruncate('abc\x1b[0mdef', 6)
  t.equal(result, 'abc\x1b[0mdef', 'ansi codes are zero width')
  result = wideTruncate('abc\x1b[0mdef', 4)
  t.equal(result, 'abc\x1b[0md', 'ansi codes are zero width, clip text')

  t.end()
})
