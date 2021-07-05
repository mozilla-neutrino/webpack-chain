module.exports = class extends Function {
  constructor() {
    super();
    return new Proxy(this, {
      apply: (target, thisArg, args) => target.classCall(...args),
    });
  }

  classCall() {
    throw new Error('not implemented');
  }
};
