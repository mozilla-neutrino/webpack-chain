const ChainedMap = require('./ChainedMap');
const ChainedSet = require('./ChainedSet');

module.exports = class extends ChainedMap {
  constructor(parent) {
    super(parent);

    this.allowedHosts = new ChainedSet(this);

    this.extend([
      'after',
      'before',
      'bonjour',
      'clientLogLevel',
      'compress',
      'contentBase',
      'contentBasePublicPath',
      'disableHostCheck',
      'filename',
      'headers',
      'historyApiFallback',
      'host',
      'hot',
      'hotOnly',
      'http2',
      'https',
      'index',
      'injectClient',
      'injectHot',
      'inline',
      'lazy',
      'liveReload',
      'mimeTypes',
      'noInfo',
      'onListening',
      'open',
      'openPage',
      'overlay',
      'pfx',
      'pfxPassphrase',
      'port',
      'proxy',
      'progress',
      'public',
      'publicPath',
      'quiet',
      'serveIndex',
      'setup',
      'socket',
      'sockHost',
      'sockPath',
      'sockPort',
      'staticOptions',
      'stats',
      'stdin',
      'transportMode',
      'useLocalIp',
      'watchContentBase',
      'watchOptions',
      'writeToDisk',
    ]);
  }

  toConfig() {
    return this.clean({
      allowedHosts: this.allowedHosts.values(),
      ...(this.entries() || {}),
    });
  }

  merge(obj, omit = []) {
    if (!omit.includes('allowedHosts') && 'allowedHosts' in obj) {
      this.allowedHosts.merge(obj.allowedHosts);
    }

    return super.merge(obj, ['allowedHosts']);
  }
};
