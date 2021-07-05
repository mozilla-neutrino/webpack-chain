module.exports = function createChainable(superClass) {
  return class extends superClass {
    constructor(parent) {
      super();
      this.parent = parent;
    }

    batch(handler) {
      handler(this);
      return this;
    }

    end() {
      return this.parent;
    }
  };
};
