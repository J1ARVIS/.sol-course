// SPDX-License-Identifier: MIT.

pragma solidity ^0.8.17;

import "https://github.com/bokkypoobah/BokkyPooBahsDateTimeLibrary/blob/master/contracts/BokkyPooBahsDateTimeLibrary.sol";
import "hardhat/console.sol";

contract Ownable {

    address _owner;

    constructor (address owner){
        _owner = owner;
    }

    function getOwner() view public returns(address) {
        return _owner;
    }

    modifier OnlyOwner{
        require(msg.sender == _owner, "Sender should be the owner of the contract");
        _;
    }
}

contract TeamDB is Ownable{

    uint256 constant BIRTHDAYBONUS = 100000000000000000;

    address[] _teammates;

    constructor() Ownable(msg.sender) {

    }

    function addTeammate(address account, string memory name, uint salary, uint256 bthday_year, uint256 bthday_month, uint256 bthday_day) public OnlyOwner {
        require(msg.sender != account, "Can't add oneself !");
        uint256 birthday = BokkyPooBahsDateTimeLibrary.timestampFromDate(bthday_year, bthday_month, bthday_day);
        Teammate newTeammate = new Teammate(account, name, salary, birthday);
        _teammates.push(address(newTeammate));
        console.log("New Teammate ", name, " added. Address - ", account); //4 parameters maximum
        emit NewContact(account, name, salary, birthday);
    }
    function getTeammateContract(uint256 index) view public returns(Teammate){
        return Teammate(payable(_teammates[index]));
    }

    function deposit() public payable{

    }
    function changeSalary(uint256 index, uint256 salary) public OnlyOwner{
        getTeammateContract(index).setSalary(salary);
    }
    function sendSalaryAuto() public OnlyOwner{
        require(_teammates.length > 0, "No teammates yet.");
        uint256 salarySum = 0;
        for (uint256 i=0; i<_teammates.length; i++){
            salarySum += getTeammateContract(i).getSalary();
        }
        require(address(this).balance >= salarySum, "Not enough funds on the contract.");
        for (uint256 i=0; i<_teammates.length; i++){
            (bool sent,) = payable(_teammates[i]).call{value: getTeammateContract(i).getSalary()}("");
            require(sent, "Failed to send Ether");
            console.log("Salary sent to ", getTeammateContract(i).getName(), "'s contract. Teammate's address - ", getTeammateContract(i).getAccount());
            emit SalaryPaid(getTeammateContract(i).getAccount(), getTeammateContract(i).getName(), getTeammateContract(i).getSalary());
        }
    }

    function getDate(uint256 timestamp) pure internal returns(uint256 year, uint256 month, uint256 day){
        (year, month, day) = BokkyPooBahsDateTimeLibrary.timestampToDate(timestamp); 
    }
    function checkBirthday(uint256 index) view public returns(bool){
        (, uint256 bthday_month, uint256 bthday_day) = getDate(getTeammateContract(index).getBirthday());
        (, uint256 today_month, uint256 today_day) = getDate(block.timestamp);
        if (bthday_month == today_month && bthday_day == today_day) {
            return true; 
        } 
        return false;
    }
    function sendBirthdayBonus() public OnlyOwner{
        require(_teammates.length > 0, "No teammates yet.");
        for (uint256 i=0; i<_teammates.length; i++) {
            if(checkBirthday(i)) {
                if(getTeammateContract(i).getTodayBirthdayPaid() == false) {
                    require(address(this).balance >= BIRTHDAYBONUS, "Not enough funds on the contract.");
                    (bool sent,) = payable(_teammates[i]).call{value: BIRTHDAYBONUS}("");
                    require(sent, "Failed to send Ether");
                    getTeammateContract(i).setTodayBirthdayPaid(true);
                    console.log(getTeammateContract(i).getName(), "has birthday today!");
                    emit HappyBirthday(getTeammateContract(i).getName(), getTeammateContract(i).getBirthday(), getTeammateContract(i).getTodayBirthdayPaid());
                }
            }
            else if (getTeammateContract(i).getTodayBirthdayPaid()) getTeammateContract(i).setTodayBirthdayPaid(false);
        }
    }

    event NewContact(address account, string name, uint256 salary, uint256 birthday);
    event HappyBirthday(string name, uint256 birthday, bool bonusPaid);
    event SalaryPaid(address account, string name, uint256 salary);
}

contract Teammate is Ownable{
    string internal _name;
    address internal _account;
    uint256 internal _salary;
    uint256 internal _birthday;
    bool internal _todayBirthdayPaid;

    constructor(address account, string memory name, uint salary, uint256 birthday) Ownable(account) {
        _name = name;
        _account = account;
        _salary = salary;
        _birthday = birthday;
        _todayBirthdayPaid = false;
    }

    function getAccount() view public returns(address) {
        return _account;
    }
    function getName() view public returns(string memory) {
        return _name;
    }
    function getSalary() view public returns(uint256) {
        return _salary;
    }
    function setSalary(uint256 salary) public {
        _salary = salary;
    }
    function getBirthday() view public returns(uint256) {
        return _birthday;
    }
    function getTodayBirthdayPaid() view public returns(bool) {
        return _todayBirthdayPaid;
    }
    function setTodayBirthdayPaid(bool todayBirthdayPaid) public{
        _todayBirthdayPaid = todayBirthdayPaid;
    }

    receive() external payable {
        console.log(msg.value, " Wei sent to contract balance");
    }
    fallback() external payable {
        console.log(msg.value, " Wei sent to contract balance");
    }
    function withdraw(uint256 wdAmount) public OnlyOwner returns(bool){
        require(wdAmount >= getBalance(), "Not enough funds on the contract.");
        payable(getOwner()).transfer(wdAmount);
        return true;
    }
    function getBalance() view public returns(uint256){
        return address(this).balance;
    }
}