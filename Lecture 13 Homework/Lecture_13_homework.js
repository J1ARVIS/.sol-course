let Web3 = require('web3');

let web3 = new Web3("HTTP://127.0.0.1:7545");

let contract_Address = "0x4BC6656d516Ea360a953328CFabF55735bb627E6"; 
let ContactBook_ABI = require("./ContactBook_ABI.js");
let contract = new web3.eth.Contract(ContactBook_ABI, contract_Address);

async function CallContact(index) {
    return await contract.methods.CallContact(index).call();
}
async function getContactContract(index) {
    return await contract.methods.getContactContract(index).call();
}
async function addContact(name) {
    return await contract.methods.addContact (name).send(
        {from: "0x924EdaE72256a4cC672176946894856546e71227", gas: "3000000"});
}

async function main() {
    console.log(await CallContact(0));
    console.log("Contract address - " + await getContactContract(0));
    console.log("------------------------------------------------------");
    console.log(await addContact("Scarlett"));
    console.log("------------------------------------------------------");
    console.log(await CallContact(1));
    console.log("Contract address - " + await getContactContract(1));
}
main();