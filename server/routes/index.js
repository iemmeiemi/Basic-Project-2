const { notFound, errHandler } = require('../middlewares/errHandler')
const userRouter = require('./userRouter');

const init = (app) => {
    
    app.use('/api/user', userRouter);

    app.use(notFound);
    app.use(errHandler);

}

module.exports = { init }