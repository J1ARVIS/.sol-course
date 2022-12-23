// SPDX-License-Identifier: MIT.

pragma solidity ^0.8.17;

contract TeamDB {

    address _owner;
    string _name;

    uint256 _TeammateNumber;
    address[] _Addresses;
    mapping(address => string) _Names;
    mapping(address => uint) _Salary;

    constructor(string memory name) {
        _name = name;
        _owner = msg.sender;
    }

    function getOwnerName() view public returns(string memory){
        return string.concat("The Owner name is ",_name,".");
    }
    function getOwnerAddress() view public returns(address){
        return _owner;
    }

    function addTeammate(address account, string memory name, uint salary) public OnlyOwner{
        _Addresses.push(account);
        _TeammateNumber++;
        _Names[account] = name;
        _Salary[account] = salary;
        emit NewContact(account, name, _TeammateNumber, salary);
    }

    function getAddressByIndex(uint256 index) view public returns(address) {
        return _Addresses[index];
    }
    function getNameByAddress(address account) view public returns(string memory) {
        return _Names[account];
    }

    function getNameByIndex(uint256 index) view public returns(string memory){
        return getNameByAddress(getAddressByIndex(index));
    }
    function changeSalary(address account, uint salary) public OnlyOwner{
        _Salary[account] = salary;
    }
    function deposit() public payable{
    }

    function sendSalary(uint256 index, uint256 amount) public OnlyOwner{
        payable(getAddressByIndex(index)).transfer(amount);
    }
    function sendSalaryAuto() public OnlyOwner{
        for (uint256 i=0; i < _TeammateNumber; i++){
            payable(getAddressByIndex(i)).transfer(_Salary[getAddressByIndex(i)]);
        }
    }
    function sendVesting() public OnlyOwner{
        for (uint256 i=0; i < _TeammateNumber; i++){
            payable(getAddressByIndex(i)).transfer(100000000000000000);
        }
    }

    modifier OnlyOwner{
        require(msg.sender == _owner, "Sender should be the owner of the contract");
        _;
    }

    event NewContact(address account, string name, uint256 number, uint salary);
}