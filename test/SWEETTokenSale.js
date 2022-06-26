const SWEETToken = artifacts.require('./SWEETToken.sol');
const SWEETTokenSale = artifacts.require('./SWEETTokenSale.sol');

contract('SWEETTokenSale', function(accounts){
    
    var tokenInstance, tokenSaleInstance;
    var buyer = accounts[1];
    var admin = accounts[0];
    var tokenPrice = 1000000000000000;
    var tokensAvailable = 10000;
    var numberOfTokens;
    
    it('Initialize contract with the correct address',function(){
        return SWEETToken.deployed().then(function(instance){
            tokenInstance = instance;
            return SWEETTokenSale.deployed().then(function(instance){
                tokenSaleInstance = instance;
                return tokenSaleInstance.tokenPrice();
            }).then(function(price){
                assert.equal(price.toNumber(),1000000000000000,'Has the token price');
            });
        });
    });

    it('Facilitates the correct buying of tokens',function(){
        return SWEETToken.deployed().then(function(instance){
            tokenInstance = instance;
            return SWEETTokenSale.deployed();
        }).then(function(instance){
            tokenSaleInstance = instance;
            return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable,{from : admin});
        }).then(function(receipt){
            return tokenInstance.balanceOf(tokenSaleInstance.address);
        }).then(function(balance){
            assert.equal(balance.toNumber(),10000,'Balance of token Sale contract');
            return tokenSaleInstance.buyTokens.call(25000,{ from: accounts[1], value:0 });
        }).then(assert.fail).catch(function(error){
            assert(error.message.toString().indexOf('revert')>=0,'Insufficient Tokens!');
            return tokenSaleInstance.buyTokens.call(1,{ from: accounts[1], value:0});
        }).then(assert.fail).catch(function(error){
            assert(error.message.toString().indexOf('revert')>=0,'Insufficient Funds!');
            return tokenSaleInstance.buyTokens.call(25000,{ from: accounts[1], value: 25000000000000000000});
        }).then(assert.fail).catch(function(error){
            assert(error.message.toString().indexOf('revert')>=0,'Insufficient amount of tokens available!');
            return tokenSaleInstance.buyTokens(1,{ from: accounts[1], value: 1000000000000000});
        }).then(function(receipt){
            assert.equal(receipt.logs.length,1,'Logs one event');
            assert.equal(receipt.logs[0].event,'Sell','Logs the "Sell" event');
            assert.equal(receipt.logs[0].args._buyer,accounts[1],'Logs the wallet address of the buyer');
            assert.equal(receipt.logs[0].args._amount,1,'Logs the number of tokens bought by the buyer');
            return tokenInstance.balanceOf(tokenSaleInstance.address);
        }).then(function(balance){
            assert.equal(balance.toNumber(),9999,'Account 1 Balance');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(),14000,'Deployer Balance');
        //     return tokenSaleInstance.tokensSold();
        // }).then(function(tokenssold){
        //     assert.equal(tokenssold.toNumber(),1,'Number of tokens sold');
        //     return tokenInstance.balanceOf(accounts[0]);
        // }).then(function(balance){
        //     assert.equal(balance.toNumber(),14000,'Admin of token sale contract balance');
        });
    });

    it('Ends the Tokens Sale',function(){
        return SWEETToken.deployed().then(function(instance){
            tokenInstance = instance;
            return SWEETTokenSale.deployed();
        }).then(function(instance){
            tokenSaleInstance = instance;
            return tokenInstance.balanceOf(admin);
        }).then(function(balance){
            assert.equal(balance.toNumber(),14000,'Deployer balance');
            return tokenInstance.balanceOf(tokenSaleInstance.address);
        }).then(function(balance){
            assert.equal(balance.toNumber(),9999,'Deployer balance');
            return tokenSaleInstance.endSale.call({from : accounts[1]});
        }).then(assert.fail).catch(function(error){
            assert(error.message.toString().indexOf('revert')>=0,'Only admin can call this function');
            return tokenSaleInstance.endSale({from : accounts[0]});
        }).then(function(receipt){
            return tokenInstance.balanceOf(admin);
        }).then(function(balance){
            assert.equal(balance.toNumber(),23999,'Admin balance');
            return tokenInstance.balanceOf(tokenSaleInstance.address);
        }).then(function(balance){
            assert.equal(balance.toNumber(),0,'Deployer balance');
            return tokenSaleInstance.contractExists(tokenSaleInstance.address);
        }).then(function(success){
            assert.equal(success,false,'Contract exist');
        });
    });

});


