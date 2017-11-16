#!/usr/bin/env node

const prompt = require('prompt');
const request = require('request');
const cheerio = require('cheerio');
const print = console.log;

prompt.start()

prompt.get(['book'], function (err, result) {
	let url = 'http://alkitab.mobi/tb/' + result.book
	request(url, function(err, resp, body){
	    if(!err & resp.statusCode == 200) {
	        const $ = cheerio.load(body);
			let chapters = [];

	        $('span.style2 a').each(function (i, elm) {
				let raw = $(this).text();
				let firstOne = raw.replace('[', '');
				let secondOne = firstOne.replace(']', '');
				let thirdOne = secondOne.replace(' ', '');
				let fourthOne = '- ' + thirdOne + ' \n';

				chapters.push(fourthOne)
				// chapters.join(' ')
				// chapters.replace(',', '')
				// let final = fifthOne
	        });

			// if (result.full == total) {
			// 	console.log(result.full + ' does exist.')
			// } else {
			// 	console.log(result.full + ' doesn\'t exist.')
			// }

			print('\n' + typeof chapters)
	    } else {
			print('Error : ' + err)
		}
	})
})
