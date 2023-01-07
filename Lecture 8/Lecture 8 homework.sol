// SPDX-License-Identifier: MIT.

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract ContactBook {
    
    address[] _contacts;

    function addContact(string memory name) public {
        Contact newContact = new Contact(name);
        _contacts.push(address(newContact));
        console.log("New Contact ", name, " added. Contract address - ", address(newContact));
    }

    function CallContact(uint256 index) view public returns(string memory){
        return Contact(_contacts[index]).reply();
    }

    function getContactContract(uint256 index) view public returns (address) {
        return _contacts[index];
    }
}

contract Contact {

    string _name;

    constructor(string memory name) {
        _name = name;
    }

    function getName() view public returns(string memory){
        return _name;
    }

    function reply() view public returns (string memory){
        return string.concat(getName(), " on call!");
    }
}