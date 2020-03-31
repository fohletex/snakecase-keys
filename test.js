'use strict'

var test = require('tape')
var Snake = require('./')

test(function (t) {
  t.deepEqual(Snake({ fooBar: 'baz', nested: { fooBar: 'baz' } }), { foo_bar: 'baz', nested: { foo_bar: 'baz' } })
  t.end()
})

test('deep', function (t) {
  t.deepEqual(
    Snake({ fooBar: { barBaz: 'qux' } }, { deep: false }),
    { foo_bar: { barBaz: 'qux' } }
  )
  t.deepEqual(
    Snake({ deepTrue: { fooBar: 'baz', deepFalse: { fooBar: 'qux' } } }, { deep: function (k) { return k !== 'deepFalse' } }),
    { deep_true: { foo_bar: 'baz', deep_false: { fooBar: 'qux' } } }
  )
  t.end()
})

test('arrays', function (t) {
  var result = Snake({ foo: [0, 1, 2] })
  t.deepEqual(result, { foo: [0, 1, 2] })
  t.ok(Array.isArray(result.foo))
  t.end()
})

test('exclude', function (t) {
  t.deepEqual(
    Snake({ fooBar: 'baz', barBaz: 'qux' }, { exclude: ['fooBar'] }),
    { fooBar: 'baz', bar_baz: 'qux' }
  )
  t.deepEqual(
    Snake({ fooBar: 'baz', barBaz: 'qux' }, { exclude: [/^foo/, /^bar/] }),
    { fooBar: 'baz', barBaz: 'qux' }
  )
  t.end()
})
