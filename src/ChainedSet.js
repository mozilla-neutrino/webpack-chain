const createSet = require('./createClass/createSet');
const createChainable = require('./createClass/createChainable');

module.exports = createSet(createChainable(Object));
