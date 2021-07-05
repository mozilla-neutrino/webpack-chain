/**
 * Notes: The order structure of the type check follows the order
 * of this document: https://github.com/neutrinojs/webpack-chain#config
 */
import { Resolver } from 'enhanced-resolve';
import Config = require('webpack-chain');
import * as webpack from 'webpack';

type ResolvePlugin = Exclude<
  Exclude<webpack.ResolveOptions['plugins'], undefined>[number],
  '...'
>;

class ResolvePluginImpl implements ResolvePlugin {
  apply(resolver: Resolver): void {}
}

function expectType<T>(value: T) {}

const config = new Config();

config
  // entry
  .entry('main')
  .add('index.js')
  .add(['index.js', 'xxx.js'])
  .add({
    import: './personal.js',
    filename: 'pages/personal.js',
    dependOn: 'shared',
    chunkLoading: 'jsonp',
    layer: 'name of layer',
  })
  .delete('index.js')
  .clear()
  .when(
    false,
    (entry) => entry.clear(),
    (entry) => entry.clear(),
  )
  .batch((x) => {})
  .end()
  // entryPoints
  .entryPoints.delete('main')
  .end()
  // output
  .output.auxiliaryComment('Test Comment')
  .auxiliaryComment({
    root: 'Root Comment',
    commonjs: 'CommonJS Comment',
    commonjs2: 'CommonJS2 Comment',
    amd: 'AMD Comment',
  })
  .charset(true)
  .chunkFilename('')
  .chunkLoadTimeout(1000)
  .chunkLoadingGlobal('xasd')
  .crossOriginLoading('anonymous')
  .devtoolFallbackModuleFilenameTemplate('')
  .devtoolNamespace('')
  .devtoolModuleFilenameTemplate('')
  .filename('main.js')
  .globalObject('global')
  .hashFunction('md5')
  .hashDigest('md5')
  .hashDigestLength(15)
  .hashSalt('')
  .hotUpdateChunkFilename('update')
  .hotUpdateMainFilename('main')
  .library('var')
  .libraryExport(['MyModule', 'MySubModule'])
  .libraryTarget('var')
  .path('/')
  .pathinfo(true)
  .publicPath('/')
  .sourceMapFilename('index.js.map')
  .sourcePrefix('~')
  .strictModuleExceptionHandling(true)
  .iife(true)
  .umdNamedDefine(true)
  .clean({
    dry: true,
  })
  .end()
  // module
  .module.noParse(/.min.js$/)
  .strictExportPresence(true)
  .wrappedContextRegExp(/sdasd/)
  .generator.set('asset', {
    publicPath: 'assets/',
  })
  .end()
  // module rule
  .rule('compile')
  .test(/.js$/)
  .include.add(/.js$/)
  .end()
  .exclude.add(/node_modules/)
  .end()
  .parser({
    opt: 'foo',
  })
  .enforce('pre')
  .issuerLayer('asd')
  .sideEffects(true)
  .mimetype('application/json')
  .generator({
    asset: {
      publicPath: 'assets/',
    },
  })
  .use('babel')
  .tap((config) => [])
  .loader('babel-loader')
  .options({})
  .end()
  .use('eslint')
  .loader('eslint-loader')
  .options({})
  .after('babel')
  .end()
  .uses.delete('babel')
  .delete('eslint')
  .end()
  .pre()
  .post()
  .rule('inline')
  .after('vue')
  .resourceQuery(/inline/)
  .use('url')
  .loader('url-loader')
  .end()
  .resolve.symlinks(true)
  .fullySpecified(false)
  .end()
  .end()
  .rules.delete('inline')
  .end()
  .oneOf('inline')
  .after('vue')
  .uses.delete('babel')
  .end()
  .resourceQuery(/inline/)
  .use('url')
  .loader('url-loader')
  .end()
  .end()
  .oneOfs.delete('inline')
  .end()
  .resolve.symlinks(true)
  .end()
  .end()
  .rules.delete('compile')
  .end()
  //** support https://webpack.js.org/configuration/module/#ruletype  */
  .rule('mjs-compile')
  .test(/\.mjs$/)
  .type('javascript/auto')
  .end()
  .end()
  // resolve
  .resolve.alias.set('foo', 'bar')
  .set('foo', false)
  .set('foo', ['asd'])
  .end()
  .modules.add('index.js')
  .end()
  .aliasFields.add('foo')
  .add(['foo'])
  .end()
  .descriptionFiles.add('foo')
  .end()
  .mainFiles.add('foo')
  .end()
  .extensions.add('.js')
  .end()
  .mainFields.add('browser')
  .end()
  .mainFiles.add('index.js')
  .end()
  .roots.add('asdasd')
  .end()
  .fallback.set('asd', ['asdasd'])
  .end()
  .byDependency.set('esm', {
    mainFields: ['browser', 'module'],
  })
  .end()
  .cachePredicate(({ path, request }) => true)
  .cacheWithContext(true)
  .enforceExtension(true)
  .symlinks(true)
  .unsafeCache(false)
  .unsafeCache(/foo/)
  .preferRelative(true)
  .preferAbsolute(true)
  .plugin('foo')
  .use(ResolvePluginImpl, [])
  .end()
  .plugins.delete('foo')
  .end()
  .end()
  // resolveLoader
  .resolveLoader.moduleExtensions.add('.js')
  .end()
  .packageMains.add('index.js')
  .end()
  .modules.add('index.js')
  .end()
  .preferAbsolute(false)
  .plugin('foo')
  .use(webpack.DefinePlugin)
  .end()
  .end()
  // optimization
  .optimization.concatenateModules(true)
  .flagIncludedChunks(true)
  .mergeDuplicateChunks(true)
  .minimize(true)
  .nodeEnv(false)
  .mangleWasmImports(true)
  .portableRecords(true)
  .providedExports(true)
  .removeAvailableModules(true)
  .removeEmptyChunks(true)
  .runtimeChunk('single')
  .runtimeChunk({ name: ({}) => 'hello' })
  .sideEffects(true)
  .usedExports(true)
  .splitChunks(false)
  .splitChunks.set('chunks', 'all')
  .set('chunks', 'all')
  .end()
  .minimizer('foo')
  .use(webpack.DefinePlugin)
  .tap((config) => [])
  .end()
  .end()
  // plugins
  .plugin('foo')
  .use(webpack.DefinePlugin, [
    {
      'process.env.NODE_ENV': '',
    },
  ])
  .end()

  .plugin('bar')
  .use(webpack.DefinePlugin, [
    {
      'process.env.NODE_ENV': '',
    },
  ])
  .before('foo')
  .end()

  .plugin('baz')
  .use(webpack.DefinePlugin, [
    {
      'process.env.NODE_ENV': '',
    },
  ])
  .after('bar')
  .end()

  .plugin('asString')
  .use('package-name-or-path')
  .end()

  .plugin('asObject')
  .use({ apply: (compiler: webpack.Compiler) => {} })
  .end()

  .plugins.delete('foo')
  .delete('bar')
  .delete('baz')
  .delete('asString')
  .delete('asObject')
  .end()
  // devServer
  .devServer.allowedHosts.add('host.com')
  .clear()
  .end()
  .after(() => {})
  .before(() => {})
  .bonjour(true)
  .clientLogLevel('error')
  .compress(false)
  .contentBase('/')
  .contentBase(['foo', 'bar'])
  .contentBasePublicPath('asd')
  .disableHostCheck(true)
  .filename('hello')
  .headers({
    'Content-Type': 'text/css',
  })
  .historyApiFallback(true)
  .host('localhost')
  .hot(true)
  .hotOnly(true)
  .http2(true)
  .https(true)
  .index('test.html')
  .injectClient(false)
  .injectHot(() => false)
  .inline(true)
  .lazy(true)
  .mimeTypes({ 'text/html': ['phtml'] })
  .noInfo(true)
  .open(true)
  .openPage('/foo')
  .openPage(['/foo', '/bar'])
  .overlay(true)
  .overlay({
    warnings: true,
    errors: true,
  })
  .pfx('/path/to/file.pfx')
  .pfxPassphrase('passphrase')
  .port(8080)
  .progress(true)
  .proxy({})
  .public('foo')

  .publicPath('bar')
  .quiet(false)
  .setup((app) => {})
  .socket('socket')
  .sockHost('localhost')
  .sockPath('/sockpath/')
  .sockPort(8080)
  .staticOptions({})
  .stats({
    reasons: true,
    errors: true,
    warnings: false,
  })
  .transportMode('sockjs')
  .transportMode({
    client: {},
    server: 'ws',
  })
  .stdin(true)
  .useLocalIp(true)
  .watchContentBase(true)
  .watchOptions({})
  .writeToDisk(true)
  .end()
  // performance
  .performance(false)
  .performance.hints(false)
  .hints('warning')
  .maxEntrypointSize(20000)
  .maxAssetSize(20000)
  .assetFilter((filename: string) => true)
  .end()
  // node
  .node(false)
  .node.set('__dirname', true)
  .delete('__dirname')
  .clear()
  .end()
  // other
  .node(false)
  .amd({ foo: true })
  .bail(true)
  .cache(false)
  .cache({
    type: 'filesystem',
  })
  .devtool('hidden-source-map')
  .devtool(false)
  .context('')
  .externals('foo')
  .externals(/node_modules/)
  .externals({ test: false, foo: 'bar' })
  .externals(['foo', 'bar'])
  .externals((ctx, cb: (err0: Error | undefined, result: string) => void) =>
    cb(undefined, 'foo'),
  )
  .loader({})
  .name('config-name')
  .mode('none')
  .mode('development')
  .mode('production')
  .profile(false)
  .parallelism(2)
  .recordsPath('')
  .recordsInputPath('')
  .recordsOutputPath('')
  .stats({
    assets: false,
    publicPath: true,
    modules: false,
  })
  .target('web')
  .watch(true)
  .watchOptions({})
  .when(
    false,
    (config) => config.watch(true),
    (config) => config.watch(false),
  )
  // end
  .merge({})
  .toConfig();

// Test TypedChainedMap
const entryPoints = config.entryPoints;

expectType<typeof entryPoints>(entryPoints.clear());
expectType<typeof entryPoints>(entryPoints.delete('key'));
expectType<boolean>(entryPoints.has('key'));
expectType<Config.EntryPoint>(entryPoints.get('key'));
expectType<Config.EntryPoint>(
  entryPoints.getOrCompute('key', () => new Config.EntryPoint()),
);
expectType<typeof entryPoints>(entryPoints.set('key', new Config.EntryPoint()));
expectType<typeof entryPoints>(
  entryPoints.merge({
    key: new Config.EntryPoint(),
  }),
);
expectType<Record<string, Config.EntryPoint>>(entryPoints.entries());
expectType<typeof entryPoints>(
  entryPoints.when(
    true,
    (val) => {
      expectType<typeof entryPoints>(val);
    },
    (val) => {
      expectType<typeof entryPoints>(val);
    },
  ),
);

// Test TypedChainedSet
const extensions = config.resolve.extensions;

expectType<typeof extensions>(extensions.add('.txt'));
expectType<typeof extensions>(extensions.prepend('.txt'));
expectType<typeof extensions>(extensions.clear());
expectType<typeof extensions>(extensions.delete('.txt'));
expectType<boolean>(extensions.has('.txt'));
expectType<typeof extensions>(extensions.merge(['.txt']));
expectType<string[]>(extensions.values());
expectType<typeof extensions>(
  extensions.when(
    true,
    (val) => {
      expectType<typeof extensions>(val);
    },
    (val) => {
      expectType<typeof extensions>(val);
    },
  ),
);
