const { notFound, errHandler } = require('../middlewares/errHandler');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const userRelaRouter = require('./userRelaRouter');

const init = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/post', postRouter);
    app.use('/api/user-rela', userRelaRouter);

    app.use(notFound);
    app.use(errHandler);
};

module.exports = { init };
