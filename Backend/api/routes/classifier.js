const express = require('express')
const classifyRoutes = express.Router()
const axios = require('axios');

classifyRoutes.post("/", (req, res, next) => {
	//console.log(req.body)
	if (req.body == {}) { next({ message: "no body text passed to server" }) }
	try {
		//api url is from  https://github.com/ostheperson/fake-news-detector
		const api_url = `http://localhost:5000/api`
		axios.get(api_url, req.body).then((rex) => {
			return res.json(rex.data);
		});
	} catch (err){
		if (err.response.data) {
			res.json(err.response.data);
		} else next(err)
	}
});

module.exports = classifyRoutes