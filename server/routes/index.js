
const { notFound, errHandler } = require('../middlewares/errHandler')

const init = (app) => {
    app.use(notFound);
    app.use(errHandler);
}

module.exports = { init }