// SPDX-License-Identifier: MIT.

pragma solidity ^0.8.17;

contract Hello{
    string public _name;

    function WriteName(string memory name) public{
        _name = name;
    }

    function speak() view public returns(string memory){
        string memory _str = string.concat("Hello, ",_name,"!");
        return _str;
    }

    function getBalance() view public returns(uint256){
        return address(this).balance;
    }

    function deposit() public payable{  

    }

    function withdraw() public {
        return payable(msg.sender).transfer(getBalance());
    }
}