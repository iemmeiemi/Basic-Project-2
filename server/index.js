const express = require('express');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
require('dotenv').config();

const db = require('./models');
const routes = require('./routes');
const socket = require('./sockets/socket');

const app = express();
const port = process.env.PORT || 8888;
const httpServer = createServer(app);
socket.startServer(httpServer);

// Basic config
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes.init(app);

app.use('/', (req, res) => res.send('SERVER ON'));

// Connect to database { force: true }
db.sequelize.sync().then((req) => {
    httpServer.listen(port, () => console.log('listening on port ' + port));
    // app.listen(port, () => console.log('listening on port ' + port));
});
