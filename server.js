const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

app.use(require('cors')());

app.use(express.static(__dirname + '/dist/frontTODO'));

app.get('/config', (req, res) => {
  res.send({
    backendUrl: process.env.API_DB_URL,
    firebaseConfig: process.env.FIREBASE_CONFIG
  })
})

app.get('/*', function(req,res) {
  const Config = require('./config');

  Config.config = {
    backendUrl: process.env.API_DB_URL,
    firebaseConfig: process.env.FIREBASE_CONFIG
  };

  console.log('1', Config.config);
  config = {
    backendUrl: process.env.API_DB_URL,
    firebaseConfig: process.env.FIREBASE_CONFIG
  };

  console.log('2', config);
  setTimeout(() => {
    res.sendFile(path.join(__dirname+'/dist/frontTODO/index.html'));
  })
});

app.listen(process.env.PORT || 8080);
