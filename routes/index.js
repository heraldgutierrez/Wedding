var express = require('express');

module.exports = (function() {
	'use strict';
	var router = express.Router();

	router.get('/', function(req, res) { res.render('index', { title: 'Home' }); });
	router.get('/Wedding', function(req, res) { res.render('wedding', { title: 'Wedding' }); });
	router.get('/Wedding-Social', function(req, res) { res.render('wedding-social', { title: 'Wedding Social' }); });
	router.get('/Privacy-Policy', function(req, res) { res.render('privacy-policy', { title: 'Privacy Policy' }); });

	return router;
})();