const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
require('dotenv').config();


const client = redis.createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
	},
	password: process.env.REDIS_PASSWORD,
});
client.on('error', (err) => {
	console.log('Error ' + err);
});
const Prisma = require("prisma");
const { PrismaClient } = require("@prisma/client");
const { createPrismaRedisCache } = require("prisma-redis-middleware");

const prisma = new PrismaClient();

const cacheMiddleware = createPrismaRedisCache({
	models: [
		{ model: "User", cacheTime: 60 },
		{ model: "Event", cacheTime: 180 },
		{ model: "Comment", cacheTime: 300 },
	],
	storage: { type: "memory", options: { invalidation: true, log: console } },
	cacheTime: 300,
	onHit: (key) => {
		console.log("hit", key);
	},
	onMiss: (key) => {
		console.log("miss", key);
	},
	onError: (key) => {
		console.log("error", key);
	},
});

prisma.$use(cacheMiddleware);

const connectRedis = async () => {
	try {
		await client.connect();
		console.log('Redis Connected');
	} catch (err) {
		console.error(err);
	}
};
connectRedis();

module.exports = {
cacheMiddleware,
};
