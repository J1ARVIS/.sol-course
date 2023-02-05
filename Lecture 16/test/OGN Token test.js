let OGN = artifacts.require("ERC20");

let ogn = null;

contract("OGN Token (view)", async(accounts)=>{
    it("Token has the correct name", async()=>{
        ogn = await OGN.deployed();
        let name = "OGN Token";
        let result = await getName();
        assert.equal(result, name, "The returned name isn't the correct one");
    });
    it("Token has the correct symbol", async()=>{
        ogn = await OGN.deployed();
        let ticker = "OGN";
        let result = await getSymbol();
        assert.equal(result, ticker, "The returned symbol isn't the correct one");
    });
    it("Token's decimals are correct", async()=>{
        ogn = await OGN.deployed();
        let decimals = "14";
        let result = await getDecimals();
        assert.equal(result, decimals, "The returned decimals value isn't correct");
    });
    it("Token has the correct Total Supply", async()=>{
        ogn = await OGN.deployed();
        let supply = "930000000000000000000";
        let result = await getSupply();
        assert.equal(result, supply, "The returned Total Supply value isn't correct");
    });
    it("Token Owner has the correct balance equal to Total Supply", async()=>{
        ogn = await OGN.deployed();
        let supply = await getSupply();
        let result = await getBalance(accounts[0]);
        assert.equal(result, supply, "The returned Token Owner's balance value isn't correct");
    });
})

async function getName() {
    return await ogn.name(); 
}
async function getSymbol() {
    return await ogn.symbol(); 
}
async function getDecimals() {
    let decimals = await ogn.decimals();
    return await decimals.toString(); 
}
async function getSupply() {
    let supply = await ogn.totalSupply();
    return await supply.toString(); 
}
async function getBalance(account) {
    let balance = await ogn.balanceOf(account);
    return await balance.toString();
}