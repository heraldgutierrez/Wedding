var express = require('express');
var https = require("https");

// var tag = 'OurTravellingBAG';
var tag = 'HJSayIDo';
// var privateUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=';
var privateUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';
var publicUrl = 'https://www.instagram.com/explore/tags/' + tag + '/?__a=1';
var hAT = '7207370.a0915d4.d9afd67d4163473d97adf25e916f76f7';
var jAT = '26413495.a0915d4.6e934975128b4a01a99774aba145e10a';

module.exports = (function() {
	'use strict';
	var router = express.Router();

	router.get('/', function(req, res) { res.render('index', { title: 'Home' }); });
	router.get('/Wedding', function(req, res) { res.render('wedding2', { title: 'Wedding' }); });
	router.get('/Wedding2', function(req, res) { res.render('wedding', { title: 'Wedding' }); });
	router.get('/Wedding-Social', function(req, res) { res.render('wedding-social', { title: 'Wedding Social' }); });
	router.get('/Privacy-Policy', function(req, res) { res.render('privacy-policy', { title: 'Privacy Policy' }); });

	router.get('/HJSayIDo', function(req, res) { 
		var privateImages = [];
		getPrivatePhotos(req, res, privateImages, false);
	});

	function getPrivatePhotos(req, res, privateImages, isSecondCall) {
		var data = '';
		var url = privateUrl + '' + jAT;

		if (isSecondCall == true) {
			url = privateUrl + '' + hAT;
		}

		var request = https.get(url, function (response) {
			response.on("data", function (chunk) {
				data += chunk;
			}); 

			response.on("end", function (err) {
				var imagesJSON = JSON.parse(data);
				var caption;

				for(var i = 0; i < imagesJSON.data.length; i++) {
					if (imagesJSON.data[i].type == 'image') {
						if (imagesJSON.data[i].caption) {
							caption = imagesJSON.data[i].caption.text;
						} else {
							caption = '';
						}

						privateImages.push({
							source: imagesJSON.data[i].images.low_resolution.url,
							instagramUrl: imagesJSON.data[i].link,
							username: imagesJSON.data[i].user.username,
							caption: caption,
							time: imagesJSON.data[i].created_time
						});
					}
				}

				if (isSecondCall == false) {
					getPrivatePhotos(req, res, privateImages, true);
				} else {
					var publicImages = [];
					getPublicImages(req, res, privateImages, publicImages, '');
				}
			}); 
		}); 
	}

	function getPublicImages(req, res, privateImages, publicImages, endCursor) {
		var data = '';
		var url = publicUrl;

		if (endCursor != '') {
			url += '&max_id=' + endCursor;
		}

		var request = https.get(url, function (response) {
			response.on("data", function (chunk) {
				data += chunk;
			}); 

			response.on("end", function (err) {
				var imagesJSON = JSON.parse(data);
				var media = imagesJSON.tag.media.nodes;
				var pageInfo = imagesJSON.tag.media.page_info;

				for(var i = 0; i < media.length; i++) {
					// ignore the 1 image that already uses the hashtag
					if (media[i].code != 'uItDhXIyDK' && publicImages.length < 50) {
						publicImages.push({
							source: media[i].display_src,
							instagramUrl: 'https://www.instagram.com/p/' + media[i].code,
							caption: media[i].caption,
							time: media[i].date
						});
					}
				}

				if (pageInfo.has_next_page == true && publicImages.length < 50) {
					getPublicImages(req, res, privateImages, publicImages, pageInfo.end_cursor);
				} else {
					displayHJSayIDo(req, res, privateImages, publicImages);
				}
			}); 
		}); 
	}

	function displayHJSayIDo(req, res, privateImages, publicImages) {
		res.render('hjsayido', { 
			title: '#HJSayIDo',
			privateImages: JSON.stringify(privateImages),
			publicImages: JSON.stringify(publicImages)
		}); 
	}

	return router;
})();