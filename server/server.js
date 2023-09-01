const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();;

const db = require('./config/db');
const routes = require('./routes')

const app = express();
const port = process.env.PORT || 8888;

db.connect();
routes.init(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => res.send('SERVER ON'));

app.listen(port, () => console.log('listening on port ' + port));