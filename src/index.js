const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
// const { Client } = require('pg');

// ## init app
const PORT = process.env.PORT || 4000;
const app = express();

// ## connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis ...'));
redisClient.connect();

// ## connect to postgres db
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 5432;
// const DB_HOST = 'postgres';

// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
//     connectionString: URI,
// });
// client
//     .connect()
//     .then(() => console.log('connected to postgres db ...'))
//     .catch((err) => console.log('failed to connect to postgres db : ', err));

// ## connect to mongo db
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
    .connect(URI)
    .then(() => console.log('connected to mongo db ...'))
    .catch((err) => console.log('failed to connect to mongo db : ', err));


app.get('/', (req, res) => {
    redisClient.set('products', 'Pro Git Book');
    res.send(`<h2>Hello From Simple Node.js App! - Environment = Production</h2>`);
});

app.get('/data', async (req, res) => {
    const products = await redisClient.get('products');
    res.send(`<h2>Hello From Node.js App! - env = dev</h2> <h3>${products}</h3>`);
});

app.listen(PORT, () => console.log(`app is up and running on port ${PORT}`));