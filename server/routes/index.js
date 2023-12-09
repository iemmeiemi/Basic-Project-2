const path = require('path')

const { notFound, errHandler } = require('../middlewares/errHandler');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const userRelaRouter = require('./userRelaRouter');

const init = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/post', postRouter);
    app.use('/api/user-rela', userRelaRouter);
    app.get('/uploads/:filename', (req, res) => {
        const { filename } = req.params;
        res.sendFile(filename, { root: path.join(__dirname, '../uploads/images')});
    });
    app.use(notFound);
    app.use(errHandler);
};

module.exports = { init };
