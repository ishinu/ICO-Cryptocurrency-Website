const SWEETToken = artifacts.require("./SWEETToken.sol");
const SWEETTokenSale = artifacts.require("./SWEETTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(SWEETToken,24000).then(function(){
    var tokenPrice = 1000000000000000;
    return deployer.deploy(SWEETTokenSale,SWEETToken.address,tokenPrice)
  });
};
