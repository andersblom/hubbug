const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config({ path: 'variables.env' });

const routes = require('./routes/index');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect((app.settings.env === "test") ? process.env.TEST_MONGO_URL : process.env.MONGO_URL, function (err, res) {
	if (err) {
		console.log('🖥  🛑 Error connecting to the database. ' + err);
	} else {
		// console.log('🖥  ✅ Connected to Database: ' + (app.settings.env === "test" ? "hubbug-tests" : "hubbug @ MLAB"));
	}
});
mongoose.Promise = global.Promise;

// routes -> routes/index.js
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({
		error: err
	});
});

module.exports = app;