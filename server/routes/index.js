const { notFound, errHandler } = require('../middlewares/errHandler');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

const init = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/post', postRouter);

    app.use(notFound);
    app.use(errHandler);
};

module.exports = { init };
