/* eslint-disable max-classes-per-file */
import test from 'ava';
import { validate } from 'webpack';
import EnvironmentPlugin from 'webpack/lib/EnvironmentPlugin';
import { stringify } from 'javascript-stringify';
import Config from '../src/Config';

class StringifyPlugin {
  constructor(...args) {
    this.values = args;
  }

  apply() {
    return JSON.stringify(this.values);
  }
}

test('is ChainedMap', t => {
  const config = new Config();

  config.set('a', 'alpha');

  t.is(config.store.get('a'), 'alpha');
});

test('shorthand methods', t => {
  const config = new Config();
  const obj = {};

  config.shorthands.forEach(method => {
    obj[method] = 'alpha';
    t.is(config[method]('alpha'), config);
  });

  t.deepEqual(config.entries(), obj);
});

test('node', t => {
  const config = new Config();
  const instance = config.node
    .set('__dirname', 'mock')
    .set('__filename', 'mock')
    .end();

  t.is(instance, config);
  t.deepEqual(config.node.entries(), { __dirname: 'mock', __filename: 'mock' });
});

test('entry', t => {
  const config = new Config();

  config
    .entry('index')
    .add('babel-polyfill')
    .add('src/index.js');

  t.true(config.entryPoints.has('index'));
  t.deepEqual(config.entryPoints.get('index').values(), [
    'babel-polyfill',
    'src/index.js',
  ]);
});

test('single string entry', t => {
  const config = new Config();

  config.set('singleEntry', 'src/index.js');

  t.deepEqual(config.toConfig(), {
    entry: 'src/index.js',
  });
});

test('plugin empty', t => {
  const config = new Config();
  const instance = config
    .plugin('stringify')
    .use(StringifyPlugin)
    .end();

  t.is(instance, config);
  t.true(config.plugins.has('stringify'));
  t.deepEqual(config.plugins.get('stringify').get('args'), []);
});

test('plugin with args', t => {
  const config = new Config();

  config.plugin('stringify').use(StringifyPlugin, ['alpha', 'beta']);

  t.true(config.plugins.has('stringify'));
  t.deepEqual(config.plugins.get('stringify').get('args'), ['alpha', 'beta']);
});

test('toConfig empty', t => {
  const config = new Config();

  t.deepEqual(config.toConfig(), {});
});

test('toConfig with values', t => {
  const config = new Config();

  config.output
    .path('build')
    .end()
    .mode('development')
    .node.set('__dirname', 'mock')
    .end()
    .optimization.nodeEnv('PRODUCTION')
    .minimizer('stringify')
    .use(StringifyPlugin)
    .end()
    .end()
    .target('node')
    .plugin('stringify')
    .use(StringifyPlugin)
    .end()
    .plugin('env')
    .use(require.resolve('webpack/lib/EnvironmentPlugin'))
    .end()
    .module.defaultRule('inline')
    .use('banner')
    .loader('banner-loader')
    .options({ prefix: 'banner-prefix.txt' })
    .end()
    .end()
    .rule('compile')
    .include.add('alpha')
    .add('beta')
    .end()
    .exclude.add('alpha')
    .add('beta')
    .end()
    .post()
    .pre()
    .test(/\.js$/)
    .use('babel')
    .loader('babel-loader')
    .options({ presets: ['alpha'] });

  t.deepEqual(config.toConfig(), {
    mode: 'development',
    node: {
      __dirname: 'mock',
    },
    optimization: {
      nodeEnv: 'PRODUCTION',
      minimizer: [new StringifyPlugin()],
    },
    output: {
      path: 'build',
    },
    target: 'node',
    plugins: [new StringifyPlugin(), new EnvironmentPlugin()],
    module: {
      defaultRules: [
        {
          use: [
            {
              loader: 'banner-loader',
              options: { prefix: 'banner-prefix.txt' },
            },
          ],
        },
      ],
      rules: [
        {
          include: ['alpha', 'beta'],
          exclude: ['alpha', 'beta'],
          enforce: 'pre',
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: { presets: ['alpha'] },
            },
          ],
        },
      ],
    },
  });
});

test('merge empty', t => {
  const config = new Config();

  const obj = {
    mode: 'development',
    node: {
      __dirname: 'mock',
    },
    optimization: {
      nodeEnv: 'PRODUCTION',
    },
    output: {
      path: 'build',
    },
    target: 'node',
    entry: {
      index: ['babel-polyfill', 'src/index.js'],
    },
    plugin: { stringify: { plugin: new StringifyPlugin(), args: [] } },
  };

  const instance = config.merge(obj);

  t.is(instance, config);

  t.deepEqual(config.toConfig(), {
    mode: 'development',
    node: {
      __dirname: 'mock',
    },
    optimization: {
      nodeEnv: 'PRODUCTION',
    },
    output: {
      path: 'build',
    },
    target: 'node',
    entry: {
      index: ['babel-polyfill', 'src/index.js'],
    },
    plugins: [new StringifyPlugin()],
  });
});

test('merge with values', t => {
  const config = new Config();

  config.output
    .path('build')
    .end()
    .mode('development')
    .node.set('__dirname', 'mock')
    .end()
    .optimization.nodeEnv('PRODUCTION')
    .end()
    .entry('index')
    .add('babel-polyfill')
    .end()
    .target('node')
    .plugin('stringify')
    .use(StringifyPlugin)
    .end();

  const obj = {
    mode: 'production',
    output: {
      path: 'build',
    },
    target: 'browser',
    entry: {
      index: 'src/index.js',
    },
    plugin: { env: { plugin: new EnvironmentPlugin() } },
  };

  const instance = config.merge(obj);

  t.is(instance, config);

  t.deepEqual(config.toConfig(), {
    mode: 'production',
    node: {
      __dirname: 'mock',
    },
    optimization: {
      nodeEnv: 'PRODUCTION',
    },
    output: {
      path: 'build',
    },
    target: 'browser',
    entry: {
      index: ['babel-polyfill', 'src/index.js'],
    },
    plugins: [new StringifyPlugin(), new EnvironmentPlugin()],
  });
});

test('merge with omit', t => {
  const config = new Config();

  config.output
    .path('build')
    .end()
    .mode('development')
    .node.set('__dirname', 'mock')
    .end()
    .optimization.nodeEnv('PRODUCTION')
    .end()
    .entry('index')
    .add('babel-polyfill')
    .end()
    .target('node')
    .plugin('stringify')
    .use(StringifyPlugin)
    .end();

  const obj = {
    mode: 'production',
    output: {
      path: 'build',
    },
    target: 'browser',
    entry: {
      index: 'src/index.js',
    },
    plugin: { env: { plugin: new EnvironmentPlugin() } },
  };

  const instance = config.merge(obj, ['target']);

  t.is(instance, config);

  t.deepEqual(config.toConfig(), {
    mode: 'production',
    node: {
      __dirname: 'mock',
    },
    optimization: {
      nodeEnv: 'PRODUCTION',
    },
    output: {
      path: 'build',
    },
    target: 'node',
    entry: {
      index: ['babel-polyfill', 'src/index.js'],
    },
    plugins: [new StringifyPlugin(), new EnvironmentPlugin()],
  });
});

test('validate empty', t => {
  const config = new Config();

  const errors = validate(config.toConfig());

  t.is(errors.length, 0);
});

test('validate with entry', t => {
  const config = new Config();

  config.entry('index').add('src/index.js');

  const errors = validate(config.toConfig());

  t.is(errors.length, 0);
});

test('validate with values', t => {
  const config = new Config();

  config
    .entry('index')
    .add('babel-polyfill')
    .add('src/index.js')
    .end()
    .output.path('/build')
    .end()
    .mode('development')
    .optimization.nodeEnv('PRODUCTION')
    .end()
    .node.set('__dirname', 'mock')
    .end()
    .target('node')
    .plugin('stringify')
    .use(StringifyPlugin)
    .end()
    .plugin('env')
    .use(require.resolve('webpack/lib/EnvironmentPlugin'), [{ VAR: false }])
    .end()
    .module.rule('compile')
    .include.add('/alpha')
    .add('/beta')
    .end()
    .exclude.add('/alpha')
    .add('/beta')
    .end()
    .sideEffects(false)
    .post()
    .pre()
    .test(/\.js$/)
    .use('babel')
    .loader('babel-loader')
    .options({ presets: ['alpha'] });

  const errors = validate(config.toConfig());

  t.is(errors.length, 0);
});

test('toString', t => {
  const config = new Config();

  config.module
    .rule('alpha')
    .oneOf('beta')
    .use('babel')
    .loader('babel-loader');

  // Nested rules
  config.module
    .rule('alpha')
    .rule('nested')
    .use('babel')
    .loader('babel-loader');

  // Default rules
  config.module
    .defaultRule('default')
    .rule('nested')
    .use('babel')
    .loader('babel-loader');

  const envPluginPath = require.resolve('webpack/lib/EnvironmentPlugin');
  const stringifiedEnvPluginPath = stringify(envPluginPath);

  class FooPlugin {}
  FooPlugin.__expression = `require('foo-plugin')`;

  config
    .plugin('env')
    .use(envPluginPath, [{ VAR: false }])
    .end()
    .plugin('gamma')
    .use(FooPlugin)
    .end()
    .plugin('delta')
    .use(class BarPlugin {}, ['bar'])
    .end()
    .plugin('epsilon')
    .use(class BazPlugin {}, [{ n: 1 }, [2, 3]]);

  config.resolve.plugin('resolver').use(FooPlugin);
  config.optimization.minimizer('minifier').use(FooPlugin);

  t.is(
    config.toString().trim(),
    `
{
  resolve: {
    plugins: [
      /* config.resolve.plugin('resolver') */
      new (require('foo-plugin'))()
    ]
  },
  module: {
    defaultRules: [
      /* config.module.defaultRule('default') */
      {
        rules: [
          /* config.module.defaultRule('default').rule('nested') */
          {
            use: [
              /* config.module.defaultRule('default').rule('nested').use('babel') */
              {
                loader: 'babel-loader'
              }
            ]
          }
        ]
      }
    ],
    rules: [
      /* config.module.rule('alpha') */
      {
        rules: [
          /* config.module.rule('alpha').rule('nested') */
          {
            use: [
              /* config.module.rule('alpha').rule('nested').use('babel') */
              {
                loader: 'babel-loader'
              }
            ]
          }
        ],
        oneOf: [
          /* config.module.rule('alpha').oneOf('beta') */
          {
            use: [
              /* config.module.rule('alpha').oneOf('beta').use('babel') */
              {
                loader: 'babel-loader'
              }
            ]
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      /* config.optimization.minimizer('minifier') */
      new (require('foo-plugin'))()
    ]
  },
  plugins: [
    /* config.plugin('env') */
    new (require(${stringifiedEnvPluginPath}))(
      {
        VAR: false
      }
    ),
    /* config.plugin('gamma') */
    new (require('foo-plugin'))(),
    /* config.plugin('delta') */
    new BarPlugin(
      'bar'
    ),
    /* config.plugin('epsilon') */
    new BazPlugin(
      {
        n: 1
      },
      [
        2,
        3
      ]
    )
  ]
}
  `.trim(),
  );
});

test('toString for functions with custom expression', t => {
  const fn = function foo() {};
  fn.__expression = `require('foo')`;

  const config = new Config();

  config.module.rule('alpha').include.add(fn);

  t.is(
    config.toString().trim(),
    `
{
  module: {
    rules: [
      /* config.module.rule('alpha') */
      {
        include: [
          require('foo')
        ]
      }
    ]
  }
}
  `.trim(),
  );
});

test('toString with custom prefix', t => {
  const config = new Config();

  config.plugin('foo').use(class TestPlugin {});

  t.is(
    config.toString({ configPrefix: 'neutrino.config' }).trim(),
    `
{
  plugins: [
    /* neutrino.config.plugin('foo') */
    new TestPlugin()
  ]
}
  `.trim(),
  );
});

test('static Config.toString', t => {
  const config = new Config();
  const sass = {
    __expression: `require('sass')`,
    render() {},
  };

  config.plugin('foo').use(class TestPlugin {});

  t.is(
    Config.toString(
      Object.assign(config.toConfig(), {
        module: {
          defaultRules: [
            {
              use: [
                {
                  loader: 'banner-loader',
                  options: {
                    prefix: 'banner-prefix.txt',
                    implementation: sass,
                  },
                },
              ],
            },
          ],
        },
      }),
    ).trim(),
    `
{
  plugins: [
    /* config.plugin('foo') */
    new TestPlugin()
  ],
  module: {
    defaultRules: [
      {
        use: [
          {
            loader: 'banner-loader',
            options: {
              prefix: 'banner-prefix.txt',
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  }
}
  `.trim(),
  );
});
