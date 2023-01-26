let fs = require('fs');

console.log("Hello NodeJs!");

fs.readFile("./poem.txt", "UTF-8", (err, data)=>{
    console.log(data);
})

console.log(2023 - fs.readFileSync("./year.txt", "UTF-8"));