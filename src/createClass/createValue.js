module.exports = function createValue(superClass) {
  return class extends superClass {
    constructor(...args) {
      super(...args);
      this.value = undefined;
      this.useMap = true;
    }

    set(...args) {
      this.useMap = true;
      this.value = undefined;
      return super.set(...args);
    }

    clear() {
      this.value = undefined;
      return super.clear();
    }

    classCall(value) {
      this.clear();
      this.useMap = false;
      this.value = value;
      return this;
    }

    entries() {
      if (this.useMap) {
        return super.entries();
      }
      return this.value;
    }

    values() {
      if (this.useMap) {
        return super.values();
      }
      return this.value;
    }
  };
};
