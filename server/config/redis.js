const Redis = require('ioredis');

const redis = new Redis({
    port: process.env.REDIS_PORT ?? '6379', // Redis port
    host: process.env.REDIS_HOST ?? '127.0.0.1', // Redis host
    username: process.env.REDIS_USERNAME ?? 'default', // needs Redis >= 6
    password: process.env.REDIS_PASSWORD ?? 'my-top-secret',
    db: 0, // Defaults to 0
});

module.exports = redis;