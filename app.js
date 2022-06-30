//  -------- GLOBALS --------

// __dirname   -path to current directory
// __filename  -file name 
// require     -function used to use modules 
// module      -info about current module or file
// process     -info about env where the program is being executed 


// ===========================
// ------- Modules -----------
// ===========================

const {user} = require('./moduleEx');
const {stats} = require('./moduleEx');

// console.log(user);
// console.log(stats);

// ---- OS built-in Module 

const os = require('os');

//returns username , homedir, shell
// console.log(os.userInfo());

//returns uptime in MS
// console.log(os.uptime());

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
}

// console.log(currentOS);
// {
//     name: 'Darwin',
//     release: '19.4.0',
//     totalMem: 8589934592,
//     freeMem: 1396289536
// }


// ---- PATH built-in Module 

const path = require('path');
// console.log(path.sep);
const filePath = path.join('/pathModEx/', 'text.txt');
// console.log(filePath); // /pathModEx/text.txt
// console.log(path.basename(filePath));  // text.txt
const absolute = path.resolve(__dirname, 'pathModEx', 'test.txt');   
// console.log(absolute); // /Users/spek/Desktop/node-tut/pathModEx/test.txt


// ---- FS built-in Module 
const {readFile, readFileSync, writeFileSync} = require ('fs');

const first = readFileSync('./pathModEx/first.txt', 'utf8');
// console.log(first);   // reads text from first.txt

// writeFileSync('./pathModEx/second.txt', `I am writing to create the file`);
// writeFileSync('./pathModEx/first.txt', `I am writing to edit the file: ${first}`);

// running async 
readFile('./pathModEx/first.txt', 'utf-8', (err, result) =>{
    if(err){
        console.log(err)
        return
    }
    // console.log(result);  //reads text file
    const first = result;
})


// ---- HTTP Built-in Module
const http = require('http');
const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.end("Welcome to our HomePage");
    }
    if(req.url === '/about'){
        res.end("Welcome to our AboutPage");
    }
    
    res.end(`<h1> 404 </h1>`);
})

server.listen(5000);


