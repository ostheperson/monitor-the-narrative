const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

const classifyRoutes = require('./api/routes/classifier');
const trendsRoutes = require('./api/routes/trends');

app.use('/api/classify', classifyRoutes);
app.use('/api/trends', trendsRoutes);

// // 404
app.use((req, res) => {
	res.status(404)
	return res.json({
		message: 'Route'+req.url+' Not found.'
	});
});

// 500 - Any server error
app.use((err, req, res, next) => {
	res.status(500)
	return err.message;
});

module.exports = app