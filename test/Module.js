import test from 'ava';
import Module from '../src/Module';

test('is Chainable', t => {
  const parent = { parent: true };
  const module = new Module(parent);

  t.is(module.end(), parent);
});

test('is ChainedMap', t => {
  const module = new Module();

  module.set('a', 'alpha');

  t.is(module.get('a'), 'alpha');
});

test('rule', t => {
  const module = new Module();
  const instance = module.rule('compile').end();

  t.is(instance, module);
  t.true(module.rules.has('compile'));
});

test('defaultRule', t => {
  const module = new Module();
  const instance = module.defaultRule('banner').end();

  t.is(instance, module);
  t.true(module.defaultRules.has('banner'));
})

test('toConfig empty', t => {
  const module = new Module();

  t.deepEqual(module.toConfig(), {});
});

test('toConfig with values', t => {
  const module = new Module();

  module.rule('compile').test(/\.js$/);
  module.noParse(/.min.js/);

  t.deepEqual(module.toConfig(), { rules: [{ test: /\.js$/ }], noParse: /.min.js/ });
});
