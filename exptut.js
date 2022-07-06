// HTTP Request Messages: Method and URL  
// HTTP Response Message: Status code and Status Text 

// Methods: GET(read) POST(insert) PUT(update) DELETE 
// default Method is GET

// status codes: 
// Informational responses: (100–199)
// Successful responses:    (200–299)
// Redirection messages:    (300–399)
// Client error responses:  (400–499)
// Server error responses:  (500–599)


const http = require('http');
const {readFileSync} = require('fs');

// calling file before creating server for one file request
// const homePage = readFileSync('./index.html')
// const styles = readFileSync('./app.css');

const server = http.createServer((req, res)=>{
    // console.log(req);
    console.log(req.url);
    const url = req.url;

    if(url === '/'){
        // giving meta data 
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write(homePage);
        res.end();
    } 
    // need to create path for server to get any other file needed in HTML file
    else if(url === '/app.css'){
        // content type needs to match file type
        res.writeHead(200, {'content-type' : 'text/css'});
        res.write(styles);
        res.end();
    } else if(url === '/about'){
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write('<h1>Aboutpage</h1>');
        res.end();
    }else{
        res.writeHead(404, {'content-type' : 'text/html'});
        res.write('<h1>This page is not found</h1>');
        res.end();
    }
    
})

// server.listen(5000);





// ================================
// ====== EXPRESS JS Basics =======
// ================================

// app.get .post .put .delete 
// .all(works with all methods) 
// .use(responsible for middleware) 
// .listen(creates server )

const express = require('express')
const app = express();
const path = require('path')

// gets css from public folder
app.use(express.static(__dirname + '/public'));

// .get('url', callback function)
app.get('/', (req, res)=>{
    res.status(200).send('Homepage')
})

app.get('/about', (req,res)=>{
    // sending path file to /about url but does not include css or js files 
    res.sendFile(path.resolve(__dirname, './index.html' ));
})

// ------------------------------
// --- Getting data from API ----
// ------------------------------

app.get('/api-ex', (req, res)=>{
    res.json([{name: 'Chris'}, {name: 'Monique'}])
})

// used when url does not exist
app.all('*', (req,res)=>{
    res.status(404).send('<h2>Page does not exist</h2>')
})


// .listen(port, (req, res) callback function)
app.listen(5000, ()=>{
    console.log('Server is listening')
})


