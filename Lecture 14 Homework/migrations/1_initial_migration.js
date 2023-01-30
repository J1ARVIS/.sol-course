let Cow = artifacts.require("Cow");
let Horse = artifacts.require("Horse");
let Dog = artifacts.require("Dog");
let Wolf = artifacts.require("Wolf");
let Farmer = artifacts.require("Farmer");
let StrCompare = artifacts.require("StringCompare");

let cow = null;
let horse = null;
let dog = null;
let wolf = null;
let farmer = null;
let strcomp = null;

module.exports = async(deployer)=>{
    try{
        strcomp = await StrCompare.deployed();
        await deployer.link(strcomp, [Cow, Horse, Dog, Wolf]);
    }catch (err) {
        //console.log(err);
        await deployer.deploy(StrCompare);
        strcomp = await StrCompare.deployed();
        await deployer.link(strcomp, [Cow, Horse, Dog, Wolf]);
    }
    console.log("-------------------------------------");
    try{
        cow = await Cow.deployed();
        console.log("Contract address of Cow - " + cow.address);
    }catch (err) {
        //console.log(err);
        await deployer.deploy(Cow, "Bertha");
        cow = await Cow.deployed();
        console.log("Contract address of Cow - " + cow.address);
    }
    console.log("-------------------------------------");
    try{
        horse = await Horse.deployed();
        console.log("Contract address of Horse - " + horse.address);
    }catch (err) {
        //console.log(err);
        await deployer.deploy(Horse, "Spirit");
        horse = await Horse.deployed();
        console.log("Contract address of Horse - " + horse.address);
    }
    console.log("-------------------------------------");
    try{
        dog = await Dog.deployed();
        console.log("Contract address of Dog - " + dog.address);
    }catch (err) {
        //console.log(err);
        await deployer.deploy(Dog, "Charlie");
        dog = await Dog.deployed();
        console.log("Contract address of Dog - " + dog.address);
    }
    console.log("-------------------------------------");
    try{
        wolf = await Wolf.deployed();
        console.log("Contract address of Wolf - " + wolf.address);
    }catch (err) {
        //console.log(err);
        await deployer.deploy(Wolf);
        wolf = await Wolf.deployed();
        console.log("Contract address of Wolf - " + wolf.address);
    }
    console.log("-------------------------------------");
    try{
        farmer = await Farmer.deployed();
        console.log("Contract address of Farmer - " + farmer.address);
    }catch (err) {
        //console.log(err);
        await deployer.deploy(Farmer);
        farmer = await Farmer.deployed();
        console.log("Contract address of Farmer - " + farmer.address);
    }
    console.log("-------------------------------------");

    console.log("Cow! - " + await call(cow));
    console.log("-------------------------------------");
    console.log("Horse! - " + await call(horse));
    console.log("-------------------------------------");
    try{
        console.log(await feed(horse, "meat"));
    }catch(err){
        //console.log(err);
        console.log("Horse can't eat meat.");
    }
    console.log("-------------------------------------");
    console.log(await feed(horse, "plant"));
    console.log("-------------------------------------");
    console.log("Dog! - " + await call(dog));
    console.log("-------------------------------------");

    try{
        console.log("Wolf! - " + await call(wolf));
    }catch(err){
        //console.log(err);
        console.log("You may manage only domestic animals.\nYou can't call the Wolf.");
        console.log(await fight(wolf));
    }
}

async function call(animal) {
    return await farmer.call(animal.address);
}
async function feed(animal, food) {
    return await farmer.feed(animal.address, food);
}
async function fight(animal) {
    return await farmer.fight(animal.address);
}