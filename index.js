const bodyParser = require('body-parser');
const app = require('express')();
const { PERSPECTIVE_TOKEN } = require('./config');
const Perspective = require('perspective-api-client');
const perspective = new Perspective({ apiKey : PERSPECTIVE_TOKEN });

let server;
server = require('http').createServer(app);

server.listen(3100);

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    );
    
    res.setHeader('Access-Control-Allow-Headers', ['Content-Type']);
    next();
  });

app.post('/toxicity', (req, res) => {
  console.log(req);
})