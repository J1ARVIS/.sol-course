var Web3 = require('web3');

let web3 = new Web3("HTTP://127.0.0.1:7545");

//1st possible async realisation
/*web3.eth.getAccounts().then((data)=>{
    let acc_0 = data[0];
    console.log(acc_0);
    web3.eth.getBalance(acc_0).then((balance)=>{
        console.log(balance/1000000000000000000 + " ETH");
    });
});*/

//2nd possible async realisation
/*async function async_realisation() {
    let accounts = await web3.eth.getAccounts();
    console.log(accounts[1]);
    console.log("Balance is " + await web3.eth.getBalance(accounts[1])/1000000000000000000 + " ETH");
}
async_realisation();*/

//to import the contract:
//  1. deploy and get address
//  2: import ABI in .js file and add "module.exports = " in it, import in node.js code
//  3: create contract instance, add await(or .then) to access the data, access functions through .methods

let contract_Address = "0x64863780A29331da6FC662D48E67837456426765"; 
let TeamDB_ABI = require("./TeamDB_ABI.js");
let contract = new web3.eth.Contract(TeamDB_ABI, contract_Address);

async function getTeammate(index) {
    return await contract.methods.getTeammate(index).call();
}

let Mate2acc = "0x165A96d95897C0B2f017B2b1491b20A3C7B081ed";
let Mate2name = "Scarlett";
let Mate2salary = 1000000000000000000n;
let Mate2year = 2001;
let Mate2month = 2;
let Mate2day = 15
async function addTeammate(address, name, salary, year, month, day) {
    return await contract.methods.addTeammate(address, name, salary, year, month, day).send(
        {from: "0x924EdaE72256a4cC672176946894856546e71227", gas: "3000000"});
}

async function main() {
    console.log(await getTeammate(0));
    console.log("------------------------------------------------------");
    console.log(await addTeammate(Mate2acc, Mate2name, Mate2salary, Mate2year, Mate2month, Mate2day));
    console.log("------------------------------------------------------");
    console.log(await getTeammate(1));
}
main();