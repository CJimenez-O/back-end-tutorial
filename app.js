// course.api.com
// ==========================
// --------- GLOBALS --------
// ==========================

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

// const server = http.createServer((req,res) => {
//     if(req.url === '/'){
//         res.end("Welcome to our HomePage");
//     }
//     if(req.url === '/about'){
//         res.end("Welcome to our AboutPage");
//     }
    
//     res.end(`<h1> 404 </h1>`);
// })

// server.listen(5000);


// ===================
// ======= npm =======
// ===================

// to use nodemon type: npm run dev OR nodemon app.js
// global package install: npm install -g <packageName>
//uninstall package: npm uninstall <packageName>

// ===================
// ==== event loop ===
// ===================

// console.log('first');
setTimeout(()=>{
    // console.log('second')    // runs last due to setTimeout function being offloaded
}, 0);
// console.log('third');


// ======================
// ==== async pattern ===
// ======================


const getText = (path) => {
    return new Promise((resolve, reject) =>{
        readFile(path, 'utf-8', (err, data) =>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

// const start = async() =>{
//     try{
//         const first = await getText('./pathModEx/first.txt');
//         const second = await getText('./pathModEx/second.txt');
//         console.log(first);
//     }catch(err){
//         console.log(error)
//     }
// }

// start();


// node async native option  
const util = require('util');
const readFilePromise = util.promisify(readFile);

const start = async() =>{
    try{
        const first = await readFilePromise('./pathModEx/first.txt', 'utf8');
        const second = await readFilePromise('./pathModEx/second.txt', 'utf8');
        // console.log(first);
    }catch(err){
        console.log(error)
    }
}

start();



// ======================
// ==== Event-Driven ====
// ======================

const EventEmitter = require('events');
const customEmmitrer = new EventEmitter();

// on - listen for an event
// emit - emit an event

customEmmitrer.on('response', (name, id)=>{
    // console.log(`data received: ${name} ${id}`)
});

customEmmitrer.emit('response', 'Chris', 97);


// ======================
// ====== Streams =======
// ======================

// read file
// used since sometimes files will be too large to assign to a variable 

const {createReadStream} = require('fs');
const stream = createReadStream('./pathModEx/second.txt', {encoding: 'utf8'}) ;

stream.on('data', (result)=>{
    // console.log(result);
})
stream.on('error', (err)=>{
    // console.log(err)
})

// http example 
const fs = require('fs')
http.createServer(function(req, res){
    const fileStream = fs.createReadStream('./pathModEx/first.txt');
    fileStream.on('open', ()=>{
        // pushing from read to write stream
        fileStream.pipe(res)
    })
    fileStream.on('error', (err)=>{
        res.on(err)
    })
}).listen(3000);



