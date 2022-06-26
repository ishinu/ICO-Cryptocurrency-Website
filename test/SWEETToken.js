// const SWEETToken = artifacts.require('./SWEETToken.sol')

// contract('SWEETToken', function(accounts){

//     var tokenInstance;

//     it('Initializes the contract with the correct Name, Symbol & Standard',function(){
//         return SWEETToken.deployed().then(function(instance){
//             tokenInstance = instance;
//             return tokenInstance.name();
//         }).then(function(name){
//             assert.equal(name,"SWEET","It initializes token with the correct Name! SWEET!");
//             return tokenInstance.symbol();
//         }).then(function(symbol){
//             assert.equal(symbol,"SWT","It initializes token with the correct Symbol! SWT!");
//             return tokenInstance.standard();
//         }).then(function(standard){
//             assert.equal(standard,"v0.1.0","It initializes token with the correct Standard! v0.1.0!");
//         });
//     });

//     it('Initializes the contract with the correct supply of tokens',function(){
//         return SWEETToken.deployed().then(function(instance){
//             tokenInstance = instance;
//             return tokenInstance.totalSupply();
//         }).then(function(totalSupply){
//             assert.equal(totalSupply.toNumber(),'24000','Correct Number of token supply!')
//             return tokenInstance.balanceOf(accounts[0]);
//         }).then(function(adminBalance){
//             assert.equal(adminBalance.toNumber(),'24000','Admin have all the tokens!')
//         });
//     });

//     it('Transfering the ownership of tokens',function(){
//         return SWEETToken.deployed().then(function(instance){
//             tokenInstance = instance;
//             return tokenInstance.transfer.call(accounts[1],25000,{from : accounts[0]});
//         }).then(assert.fail).catch(function(error){
//             assert(error.message.toString().indexOf('revert')>=0,'Invalid transfer Amount!');
//             return tokenInstance.transfer.call(accounts[1],2000,{from:accounts[0]});
//         }).then(function(success){
//             assert.equal(success,true,'Transfer successful!');
//             return tokenInstance.transfer(accounts[1],2000,{ from:accounts[0]});
//         }).then(function(receipt){
//             assert.equal(receipt.logs.length,1,'triggers one event');
//             assert.equal(receipt.logs[0].event,'Transfer','Should be the "Transfer" event');
//             assert.equal(receipt.logs[0].args._from,accounts[0],'logs the account the tokens are transferred from');
//             assert.equal(receipt.logs[0].args._to,accounts[1],'logs the account the tokens are transferred to');
//             assert.equal(receipt.logs[0].args._value,2000,'logs the transfer amount');
//             return tokenInstance.balanceOf(accounts[0]);
//         }).then(function(adminBalance){
//             assert.equal(adminBalance.toNumber(),22000,'Remaining Balance');
//             return tokenInstance.balanceOf(accounts[1]);
//         }).then(function(remBalance){
//             assert.equal(remBalance.toNumber(),2000,'Account 1 Balance');
//         });
//     });

//     it('approves the amount for delegated transfer',function(){
//         return SWEETToken.deployed().then(function(instance){
//             tokenInstance = instance;
//             return tokenInstance.approve.call(accounts[1],25000,{ from: accounts[0]});
//         }).then(assert.fail).catch(function(error){
//             assert(error.message.toString().indexOf('revert')>=0,'Invalid amount!');
//             return tokenInstance.approve.call(accounts[1],100);
//         }).then(function(success){
//             assert.equal(success,true,'Correct!');
//             return tokenInstance.approve(accounts[1],100,{ from: accounts[0]});
//         }).then(function(receipt){
//             assert.equal(receipt.logs.length,1,'triggers one event');
//             assert.equal(receipt.logs[0].event,'Approval','Should be the "Approval" event');
//             assert.equal(receipt.logs[0].args._owner,accounts[0],'Approves the amount to be spent');
//             assert.equal(receipt.logs[0].args._spender,accounts[1],'Gets the approval for amount that can be spend');
//             assert.equal(receipt.logs[0].args._value,100,'Logs the approved amount');
//             return tokenInstance.allowance(accounts[0],accounts[1]);
//         }).then(function(allowance){
//             assert.equal(allowance.toNumber(),100,'Perfect Allowance amount!');
//         });
//     });

//     it('performs the delegated transfer',function(){
//         return SWEETToken.deployed().then(function(instance){
//             tokenInstance = instance;
//             return tokenInstance.transfer.call(accounts[1],2000);
//         }).then(function(success){
//             assert.equal(success,true,'Transfer Successful!');
//             return tokenInstance.transfer(accounts[1],2000);
//         }).then(function(receipt){
//             assert.equal(receipt.logs.length,1,'triggers one event');
//             assert.equal(receipt.logs[0].event,'Transfer','Should be the "Transfer" event');
//             assert.equal(receipt.logs[0].args._from,accounts[0],'logs the account the tokens are transferred from');
//             assert.equal(receipt.logs[0].args._to,accounts[1],'logs the account the tokens are transferred to');
//             assert.equal(receipt.logs[0].args._value,2000,'logs the transfer amount');
//             return tokenInstance.approve.call(accounts[2],1000,{ from : accounts[1]});
//         }).then(function(success){
//             assert.equal(success,true,'Allowance done!');
//             return tokenInstance.approve(accounts[2],1000,{ from : accounts[1]});
//         }).then(function(receipt){
//             assert.equal(receipt.logs.length,1,'triggers one event');
//             assert.equal(receipt.logs[0].event,'Approval','Should be the "Approval" event');
//             assert.equal(receipt.logs[0].args._owner,accounts[1],'Approves the amount to be spent');
//             assert.equal(receipt.logs[0].args._spender,accounts[2],'Gets the approval for amount that can be spend');
//             assert.equal(receipt.logs[0].args._value,1000,'Logs the approved amount');
//             return tokenInstance.allowance(accounts[1],accounts[2]);
//         }).then(function(allowance){
//             assert.equal(allowance.toNumber(),1000,'Approved allowance.');
//             return tokenInstance.transferFrom.call(accounts[1],accounts[3],3000,{from : accounts[2]});
//         }).then(assert.fail).catch(function(error){
//             assert(error.message.toString().indexOf('revert')>=0,'Invalid Amount!');
//             return tokenInstance.transferFrom.call(accounts[1],accounts[3],1050,{ from : accounts[2]});
//         }).then(assert.fail).catch(function(error){
//             assert(error.message.toString().indexOf('revert')>=0,'Value Greater than allowance!');
//             return tokenInstance.transferFrom.call(accounts[1],accounts[3],500,{ from: accounts[2]});
//         }).then(function(success){
//             assert.equal(success,true,'Successful delegated transfer');
//             return tokenInstance.transferFrom(accounts[1],accounts[3],500,{ from: accounts[2]});
//         }).then(function(receipt){
//             assert.equal(receipt.logs.length,1,'triggers one event');
//             assert.equal(receipt.logs[0].event,'Transfer','Should be the "Transfer" event');
//             assert.equal(receipt.logs[0].args._from,accounts[1],'logs the account the tokens are transferred from');
//             assert.equal(receipt.logs[0].args._to,accounts[3],'logs the account the tokens are transferred to');
//             assert.equal(receipt.logs[0].args._value,500,'logs the transfer amount');
//             return tokenInstance.allowance(accounts[1],accounts[2]);
//         }).then(function(allowance){
//             assert.equal(allowance.toNumber(),500,'Allowance balance');
//             return tokenInstance.balanceOf(accounts[3]);
//         }).then(function(balance){
//             assert.equal(balance.toNumber(),500,'Account balance');
//             return tokenInstance.balanceOf(accounts[0]);
//         }).then(function(balance){
//             assert.equal(balance.toNumber(),20000,'Admin balance');
//         });
//     });

// });