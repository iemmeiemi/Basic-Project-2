
const { notFound, errHandler } = require('../middlewares/errHandler')
const userRouter = require('./user');

const init = (app) => {
    
    app.use('/api/user', userRouter);

    app.use(notFound);
    app.use(errHandler);

}

module.exports = { init }