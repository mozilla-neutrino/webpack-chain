const ChainedValueMap = require('../src/ChainedValueMap');

test('is Chainable', () => {
  const parent = { parent: true };
  const map = new ChainedValueMap(parent);

  expect(map.end()).toBe(parent);
});

test('creates a backing Map', () => {
  const map = new ChainedValueMap();

  expect(map.store instanceof Map).toBe(true);
});

test('set', () => {
  const map = new ChainedValueMap();

  expect(map.set('a', 'alpha')).toBe(map);
  expect(map.store.get('a')).toBe('alpha');
});

test('get', () => {
  const map = new ChainedValueMap();

  expect(map.set('a', 'alpha')).toBe(map);
  expect(map.get('a')).toBe('alpha');
});

test('getOrCompute', () => {
  const map = new ChainedValueMap();

  expect(map.get('a')).toBeUndefined();
  expect(map.getOrCompute('a', () => 'alpha')).toBe('alpha');
  expect(map.get('a')).toBe('alpha');
});

test('clear', () => {
  const map = new ChainedValueMap();

  map.set('a', 'alpha');
  map.set('b', 'beta');
  map.set('c', 'gamma');

  expect(map.store.size).toBe(3);
  expect(map.clear()).toBe(map);
  expect(map.store.size).toBe(0);
});

test('delete', () => {
  const map = new ChainedValueMap();

  map.set('a', 'alpha');
  map.set('b', 'beta');
  map.set('c', 'gamma');

  expect(map.delete('b')).toBe(map);
  expect(map.store.size).toBe(2);
  expect(map.store.has('b')).toBe(false);
});

test('has', () => {
  const map = new ChainedValueMap();

  map.set('a', 'alpha');
  map.set('b', 'beta');
  map.set('c', 'gamma');

  expect(map.has('b')).toBe(true);
  expect(map.has('d')).toBe(false);
  expect(map.has('b')).toBe(map.store.has('b'));
});

test('values', () => {
  const map = new ChainedValueMap();

  map.set('a', 'alpha');
  map.set('b', 'beta');
  map.set('c', 'gamma');

  expect(map.values()).toStrictEqual(['alpha', 'beta', 'gamma']);
});

test('entries with values', () => {
  const map = new ChainedValueMap();

  map.set('a', 'alpha');
  map.set('b', 'beta');
  map.set('c', 'gamma');

  expect(map.entries()).toStrictEqual({ a: 'alpha', b: 'beta', c: 'gamma' });
});

test('entries with no values', () => {
  const map = new ChainedValueMap();

  expect(map.entries()).toBeUndefined();
});

test('merge with no values', () => {
  const map = new ChainedValueMap();
  const obj = { a: 'alpha', b: 'beta', c: 'gamma' };

  expect(map.merge(obj)).toBe(map);
  expect(map.entries()).toStrictEqual(obj);
});

test('merge with existing values', () => {
  const map = new ChainedValueMap();
  const obj = { a: 'alpha', b: 'beta', c: 'gamma' };

  map.set('d', 'delta');

  expect(map.merge(obj)).toBe(map);
  expect(map.entries()).toStrictEqual({
    a: 'alpha',
    b: 'beta',
    c: 'gamma',
    d: 'delta',
  });
});

test('merge with overriding values', () => {
  const map = new ChainedValueMap();
  const obj = { a: 'alpha', b: 'beta', c: 'gamma' };

  map.set('b', 'delta');

  expect(map.merge(obj)).toBe(map);
  expect(map.entries()).toStrictEqual({ a: 'alpha', b: 'beta', c: 'gamma' });
});

test('merge with omitting keys', () => {
  const map = new ChainedValueMap();
  const obj = { a: 'alpha', b: 'beta', c: 'gamma' };

  map.merge(obj, ['b']);

  expect(map.entries()).toStrictEqual({ a: 'alpha', c: 'gamma' });
});

test('when true', () => {
  const map = new ChainedValueMap();
  const right = (instance) => {
    expect(instance).toBe(map);
    instance.set('alpha', 'a');
  };
  const left = (instance) => {
    instance.set('beta', 'b');
  };

  expect(map.when(true, right, left)).toBe(map);
  expect(map.has('alpha')).toBe(true);
  expect(map.has('beta')).toBe(false);
});

test('when false', () => {
  const map = new ChainedValueMap();
  const right = (instance) => {
    instance.set('alpha', 'a');
  };
  const left = (instance) => {
    expect(instance).toBe(map);
    instance.set('beta', 'b');
  };

  expect(map.when(false, right, left)).toBe(map);
  expect(map.has('alpha')).toBe(false);
  expect(map.has('beta')).toBe(true);
});

test('clean undefined', () => {
  const map = new ChainedValueMap();
  map.set('alpha', undefined);
  map.set('beta', 'b');
  expect('alpha' in map.entries()).toBe(true);
  expect('alpha' in map.clean(map.entries())).toBe(false);
  expect('beta' in map.clean(map.entries())).toBe(true);
});

test('clean empty array', () => {
  const map = new ChainedValueMap();
  map.set('alpha', []);
  expect('alpha' in map.entries()).toBe(true);
  expect('alpha' in map.clean(map.entries())).toBe(false);
});

test('clean empty object', () => {
  const map = new ChainedValueMap();
  map.set('alpha', {});
  expect('alpha' in map.entries()).toBe(true);
  expect('alpha' in map.clean(map.entries())).toBe(false);
});

test('should apply set value', () => {
  const map = new ChainedValueMap();
  map('aaa');
  expect(map.value).toBe('aaa');
});

test('set will clean value', () => {
  const map = new ChainedValueMap();
  map('aaa');
  expect(map.set('a', 'alpha')).toBe(map);
  expect(map.store.get('a')).toBe('alpha');
  expect(map.value).toBeUndefined();
});

test('fn value will clear store', () => {
  const map = new ChainedValueMap();
  expect(map.set('a', 'alpha')).toBe(map);
  expect(map.store.get('a')).toBe('alpha');
  map('aaa');
  expect(map.value).toBe('aaa');
  expect(map.store.size).toBe(0);
});

test('getOrCompute will clean value', () => {
  const map = new ChainedValueMap();
  map('aaa');
  expect(map.getOrCompute('a', () => 'alpha')).toBe('alpha');
  expect(map.get('a')).toBe('alpha');
  expect(map.value).toBeUndefined();
});

test('clear will clean value', () => {
  const map = new ChainedValueMap();
  map('aaa');
  expect(map.value).toBe('aaa');
  map.clear();
  expect(map.value).toBeUndefined();
});

test('entries with return value or map', () => {
  const map = new ChainedValueMap();
  map('aaa');
  expect(map.entries()).toStrictEqual('aaa');
  map.set('a', 'alpha');
  map.set('b', 'beta');
  map.set('c', 'gamma');
  expect(map.entries()).toStrictEqual({ a: 'alpha', b: 'beta', c: 'gamma' });
  map('aaa');
  expect(map.entries()).toStrictEqual('aaa');
});
