const Callable = require('./Callable');
const createMap = require('./createClass/createMap');
const createChainable = require('./createClass/createChainable');
const createValue = require('./createClass/createValue');

module.exports = createValue(createMap(createChainable(Callable)));
