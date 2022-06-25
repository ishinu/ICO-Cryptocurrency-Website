const SWEETToken = artifacts.require("SWEETToken");

module.exports = function (deployer) {
  deployer.deploy(SWEETToken,24000);
};
