//SPDX-License-Identifier:MIT

pragma solidity >=0.4.0 <0.9.0;

import './SWEETToken.sol';

contract SWEETTokenSale{ 

    address admin;
    uint256 public tokenPrice;
    SWEETToken public tokenContract;
    uint256 public tokensSold;
    uint256 public tokensAvailable;

    event Sell(
        address _buyer,
        uint256 _amount
    );

    constructor (SWEETToken _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenPrice = _tokenPrice;
        tokenContract = _tokenContract;
    }

    function multiply(uint x,uint y) internal pure returns (uint z){
        require( y == 0 || (z = x * y ) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {

        require(msg.value == multiply(_numberOfTokens,tokenPrice));
        require(tokenContract.balanceOf(address(this))>=_numberOfTokens);
        require(tokenContract.transfer(msg.sender,_numberOfTokens));

        tokensSold += _numberOfTokens;
        emit Sell(msg.sender,_numberOfTokens);
    }

    function endSale() public{
        require(msg.sender == admin);
        tokenContract.transfer(admin,tokenContract.balanceOf(address(this)));
        selfdestruct(payable(admin));
    }

    function contractExists(address _contract) public view returns (bool) {
        uint _size;
        assembly {
            _size := extcodesize(_contract)
        }
        return _size > 0;
    }


}