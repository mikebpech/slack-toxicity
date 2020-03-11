const bodyParser = require('body-parser');
const app = require('express')();
const { PERSPECTIVE_TOKEN } = require('./config');
const Perspective = require('perspective-api-client');
const perspective = new Perspective({ apiKey : PERSPECTIVE_TOKEN });
const axios = require('axios');

let server;
server = require('http').createServer(app);

server.listen(3100);

app.use(bodyParser.urlencoded({ extended: true }))

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

app.post('/toxicity', async (req, res) => {
    const { response_url, text } = req.body;

    axios.request({
      method: 'POST',
      url: response_url,
    })
    const result = await perspective.analyze(text);
    console.log(JSON.stringify(result, null, 2));
    if (result.attributeScores) {
      const score = result.attributeScores['TOXICITY'].summaryScore.value;
      console.log(score);
      axios.request({
        method: 'POST',
        url: response_url,
        data: {
          response_type : "in_channel",
          blocks: [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "mikel left the following toxicity rating for: " + text
              }
            },
            {
              "type": "section",
              "block_id": "section789",
              "fields": [
                {
                  "type": "mrkdwn",
                  "text": `*Toxicity Rating*\n${score}`
                }
              ]
            }
          ]
        }
      })
    }

})
