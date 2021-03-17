const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

app.use(require('cors')());

app.use(express.static(__dirname + '/dist/frontTODO'));

app.get('/config', (req, res) => {
  res.send({
    backendUrl: process.env.API_DB_URL,
    nestJsURL: process.env.API_DB_URL_NESTJS
  })
})

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/frontTODO/index.html'));
});

app.listen(process.env.PORT || 8080);
