const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const app = express();
const userRouter = require('./src/modules/users/UserRoutes');
const eventRouter = require('./src/modules/events/EventRoutes');
const commentRouter = require('./src/modules/comments/CommentRoutes');
require('./src/utils/redis');
const serviceAccount = require('./cornell-pickup-firebase-adminsdk-35pej-5305c57ea2.json');
const admin = require('firebase-admin');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://cornell-pickup-default-rtdb.firebaseio.com',
});

app.use(cors());
app.use(cookieParser());
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

// Router Middleware
app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/comment', commentRouter);

app.get('/', (req, res) => {
	res.status(200).json({ status: 'Success', message: 'Hello, World' });
});

app.use('*', (req, res) => {
	res.status(404).json({
		success: 'false',
		message: 'Page not found',
		error: {
			statusCode: 404,
			message: 'You reached a route that is not defined on this server',
		},
	});
});

app.listen(port, function () {
	connectDb();
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
