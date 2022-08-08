require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const token = req.cookies.jwt;

	if (!token) {
		return res.status(403).send('Unauthorized Access');
	}
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).send('Invalid Token');
	}
};

module.exports = verifyToken;
