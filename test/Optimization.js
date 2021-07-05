const Optimization = require('../src/Optimization');

class StringifyPlugin {
  constructor(...args) {
    this.values = args;
  }

  apply() {
    return JSON.stringify(this.values);
  }
}

test('is Chainable', () => {
  const parent = { parent: true };
  const optimization = new Optimization(parent);

  expect(optimization.end()).toBe(parent);
});

test('shorthand methods', () => {
  const optimization = new Optimization();
  const obj = {};

  optimization.shorthands.forEach((method) => {
    obj[method] = 'alpha';
    expect(optimization[method]('alpha')).toBe(optimization);
  });

  expect(optimization.entries()).toStrictEqual(obj);
});

test('minimizer plugin with name', () => {
  const optimization = new Optimization();
  optimization.minimizer('alpha');

  expect(optimization.minimizers.get('alpha').name).toBe('alpha');
  expect(optimization.minimizers.get('alpha').type).toBe(
    'optimization.minimizer',
  );
});

test('minimizer plugin empty', () => {
  const optimization = new Optimization();
  const instance = optimization
    .minimizer('stringify')
    .use(StringifyPlugin)
    .end();

  expect(instance).toBe(optimization);
  expect(optimization.minimizers.has('stringify')).toBe(true);
  expect(optimization.minimizers.get('stringify').get('args')).toStrictEqual(
    [],
  );
});

test('minimizer plugin with args', () => {
  const optimization = new Optimization();

  optimization.minimizer('stringify').use(StringifyPlugin, ['alpha', 'beta']);

  expect(optimization.minimizers.has('stringify')).toBe(true);
  expect(optimization.minimizers.get('stringify').get('args')).toStrictEqual([
    'alpha',
    'beta',
  ]);
});

test('minimizer plugin legacy syntax', () => {
  const optimization = new Optimization();
  expect(() => optimization.minimizer([new StringifyPlugin()])).toThrow(
    /optimization.minimizer\(\) no longer supports being passed an array/,
  );
});

test('optimization merge', () => {
  const optimization = new Optimization();
  const obj = {
    minimizer: {
      stringify: {
        plugin: StringifyPlugin,
        args: ['alpha', 'beta'],
      },
    },
  };

  expect(optimization.merge(obj)).toBe(optimization);
  expect(optimization.minimizers.has('stringify')).toBe(true);
  expect(optimization.minimizers.get('stringify').get('args')).toStrictEqual([
    'alpha',
    'beta',
  ]);
});

test('toConfig empty', () => {
  const optimization = new Optimization();

  expect(optimization.toConfig()).toStrictEqual({});
});

test('toConfig with values', () => {
  const optimization = new Optimization();

  optimization
    .minimizer('foo')
    .use(StringifyPlugin)
    .end()
    .splitChunks.set('chunks', 'all');

  expect(optimization.toConfig()).toStrictEqual({
    minimizer: [new StringifyPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  });
});
