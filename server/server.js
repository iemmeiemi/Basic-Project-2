const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();;

const db = require('./models');
const routes = require('./routes')

const app = express();
const port = process.env.PORT || 8888;

routes.init(app);

// Basic config
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => res.send('SERVER ON'));

// Connect to database
db.sequelize.sync({ force: true }).then(req => {
    app.listen(port, () => console.log('listening on port ' + port))
})