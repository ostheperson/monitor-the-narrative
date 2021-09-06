const express = require('express')
const trendsRoutes = express.Router()
const googleTrends = require('google-trends-api');

trendsRoutes.post('/', async (req, res, next) => {
	let data = req.body
	try {
		await googleTrends.interestOverTime({keyword: data.query, startTime: new Date(data.startDate), endTime: new Date(data.endDate), geo: "NG"}, (err, results) => {
			if (err) {
				console.error('there was an error!')
				next(err)
			}

			data = JSON.parse(results)
			//let rex = data.default.timelineData
			res.json(data.default.timelineData)
		})
	} catch (err) {
		console.log(err)
	}
});

module.exports = trendsRoutes