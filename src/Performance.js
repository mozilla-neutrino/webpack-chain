const ChainedValueMap = require('./ChainedValueMap');

module.exports = class extends ChainedValueMap {
  constructor(parent) {
    super(parent);
    this.extend(['assetFilter', 'hints', 'maxAssetSize', 'maxEntrypointSize']);
  }
};
