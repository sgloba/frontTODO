
//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use(require('cors')());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/frontTODO'));

app.get('/config', (req, res) => {
  // get from env all config
  res.send({
    backendUrl: 'https://desolate-taiga-15678.herokuapp.com/api'
  })
})

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/frontTODO/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
