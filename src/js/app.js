App = { 
    init: function(){
        console.log("Initialised");
        return App.initWeb3();
    },
    initWeb3: function(){
        if(typeof web3 !== 'undefined'){
            App.web3Provider = window.ethereum;
            web3 = new Web3(window.ethereum);
            console.log("Web3 initialized");
        }else{
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }
    }
}

$(function(){
    $(window).load(function(){
        App.init();
    })
});