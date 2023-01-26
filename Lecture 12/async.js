let fs = require('fs');
let sm_txt_name = "./small_text.txt";
let big_txt_name = "./big_text.txt";

fs.readFile(big_txt_name, 'UTF-8', (err, data)=>{
    console.log(data);
});
fs.readFile(sm_txt_name, 'UTF-8', (err, data)=>{
    console.log(data);
});

//sync
//  console.log();
//  is executed immediately

//async
//  fs.readFile();
//  is executed after operation is finished
//  needs callback - what to do after operation is finished
//  callback example:
//      (err, data)=>{}