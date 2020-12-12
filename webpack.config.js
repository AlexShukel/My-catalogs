const reactConfig = require("./webpack.config.react");
const electronConfig = require("./webpack.config.electron");

module.exports = [electronConfig, reactConfig];
