const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { config } = require('nodemon');

const app = express();
app.use(cors());
app.use(bodyParser.json()); //permitindo requisições em json para a api
app.use(bodyParser.urlencoded({extended: false})); //permitindo requisições GET (pela url)

require('./controllers/authController')(app);
// require('./controllers/projectController')(app);
require('./controllers/playlistController')(app);

app.listen(3030, () => console.log('Rodando em http://localhost:3030'))
