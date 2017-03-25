var express = require('express');
var https = require("https");

// var tag = 'OurTravellingBAG';
var tag = 'HJSayIDo';
var privateUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=';
var publicUrl = 'https://www.instagram.com/explore/tags/' + tag + '/?__a=1';
var hAT = '7207370.a0915d4.d9afd67d4163473d97adf25e916f76f7';
var jAT = '26413495.a0915d4.6e934975128b4a01a99774aba145e10a';

module.exports = (function() {
	'use strict';
	var router = express.Router();

	router.get('/', function(req, res) { res.render('index', { title: 'Home' }); });
	router.get('/Wedding', function(req, res) { res.render('wedding', { title: 'Wedding' }); });
	router.get('/Wedding-Social', function(req, res) { res.render('wedding-social', { title: 'Wedding Social' }); });
	router.get('/Privacy-Policy', function(req, res) { res.render('privacy-policy', { title: 'Privacy Policy' }); });


	router.get('/HJSayIDo', function(req, res, next) { 
		var data = '';
		var url = privateUrl + '' + jAT;
		var request = https.get(url, function (response) {
			response.on("data", function (chunk) {
				data += chunk;
			}); 

			response.on("end", function (err) {
				var imagesJSON = JSON.parse(data);
				var images = [];
				for(var i = 0; i < imagesJSON.data.length; i++) {
					if (imagesJSON.data[i].type == 'image') {
						images.push({
							source: imagesJSON.data[i].images.low_resolution.url,
							profileUrl: imagesJSON.data[i].link,
							time: imagesJSON.data[i].created_time
						});
					}
				}

				getHPrivatePhotots(req, res, images);
			}); 
		}); 
	});

	function getHPrivatePhotots(req, res, privateImages) {
		var data = '';
		var url = privateUrl + '' + hAT;
		var request = https.get(url, function (response) {
			response.on("data", function (chunk) {
				data += chunk;
			}); 

			response.on("end", function (err) {
				var imagesJSON = JSON.parse(data);
				for(var i = 0; i < imagesJSON.data.length; i++) {
					if (imagesJSON.data[i].type == 'image') {
						privateImages.push({
							source: imagesJSON.data[i].images.low_resolution.url,
							profileUrl: imagesJSON.data[i].link,
							time: imagesJSON.data[i].created_time
						});
					}
				}

				getPublicImages(req, res, privateImages);				
			}); 
		}); 
	}

	function getPublicImages(req, res, privateImages) {
		var data = '';
		var request = https.get(publicUrl, function (response) {
			response.on("data", function (chunk) {
				data += chunk;
			}); 

			response.on("end", function (err) {
				var imagesJSON = JSON.parse(data);
				var media = imagesJSON.tag.media.nodes;
				var pageInfo = imagesJSON.tag.media.page_info;
				var images = [];

				for(var i = 0; i < media.length; i++) {
					images.push({
						source: media[i].display_src,
						profileUrl: 'https://www.instagram.com/p/' + media[i].code,
						time: media[i].date
					});
				}

				if (pageInfo.has_next_page == true) {
					getMorePublicImages(req, res, privateImages, images, pageInfo.end_cursor);
				} else {
					res.render('hjsayido', { 
						title: '#HJSayIDo',
						privateImages: JSON.stringify(privateImages),
						publicImages: JSON.stringify(images)
					}); 
				}
			}); 
		}); 
	}

	function getMorePublicImages(req, res, privateImages, publicImages, endCursor) {
		var data = '';
		var request = https.get(publicUrl + '&max_id=' + endCursor, function (response) {
			response.on("data", function (chunk) {
				data += chunk;
			}); 

			response.on("end", function (err) {
				var imagesJSON = JSON.parse(data);
				var media = imagesJSON.tag.media.nodes;
				var pageInfo = imagesJSON.tag.media.page_info;
				var images = [];

				for(var i = 0; i < media.length; i++) {
					if (publicImages.length < 50) {
						publicImages.push({
							source: media[i].display_src,
							profileUrl: 'https://www.instagram.com/p/' + media[i].code,
							time: media[i].date
						});
					}
				}

				if (pageInfo.has_next_page == true && publicImages.length < 50) {
					getMorePublicImages(req, res, privateImages, publicImages, pageInfo.end_cursor);
				} else {
					res.render('hjsayido', { 
						title: '#HJSayIDo',
						privateImages: JSON.stringify(privateImages),
						publicImages: JSON.stringify(publicImages)
					}); 
				}
			}); 
		}); 
	}

	function displayHJSayIDo(req, res, privateImages, publicImages) {
		res.render('hjsayido', { 
			title: '#HJSayIDo',
			privateImages: privateImages,
			publicImages: publicImages
		}); 
	}

	return router;
})();