const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
require('dotenv').config();
const client = redis.createClient(process.env.REDIS_URL);
client.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
	try {
		await client.connect();
		console.log('Redis Connected');
	} catch (err) {
		console.error(err);
	}
};
connectRedis();

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = { expire: 60 }) {
	this.useCache = true;
	this.expire = options.expire;
	this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

	return this;
};

mongoose.Query.prototype.exec = async function () {
	if (!this.useCache) {
		return await exec.apply(this, arguments);
	}

	const key = JSON.stringify({
		...this.getQuery(),
		collection: this.mongooseCollection.name,
	});

	const cacheValue = await client.hGet(this.hashKey, key);

	if (!cacheValue) {
		const result = await exec.apply(this, arguments);
		client.hSet(this.hashKey, key, JSON.stringify(result));
		client.expire(this.hashKey, this.expire);

		console.log('Return data from MongoDB');
		return result;
	}

	// return found cachedValue
	const doc = JSON.parse(cacheValue);
	console.log('Return data from Redis');
	return Array.isArray(doc)
		? doc.map((d) => new this.model(d))
		: new this.model(doc);
};

module.exports = {
	clearHash(hashKey) {
		client.del(JSON.stringify(hashKey));
	},
};
