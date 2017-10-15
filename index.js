#!/usr/bin/env node
const prompt = require('prompt');
const request = require('request');
const cheerio = require('cheerio');

prompt.start()

prompt.get(['full', 'book', 'chapter'], function (err, result) {
	let url = 'http://alkitab.mobi/tb/' + result.book + '/' + result.chapter
	request(url, function(err, resp, body){
	    if(!err & resp.statusCode == 200) {
	        const $ = cheerio.load(body);
	        const total = $('span.style1 strong').eq(2).text();
		        
			if (result.full == total) {
				console.log(result.full + ' does exist.')
			} else { 
				console.log(result.full + ' doesn\'t exist.')
			}
	    }
	})
})
