const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection
const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Database is now connected');
	} catch (err) {
		console.error(err);
	}
};

app.get('/', (req, res) => {
	res.send("<h1 style='text-align:center; margin-top:50px'>We are live!</h1>");
});

app.listen(port, function () {
	connectDb();
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

process.on('SIGINT', () => {
	console.log('Bye bye!');
	process.exit();
});
