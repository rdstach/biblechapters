#!/usr/bin/env node

const prompt = require('prompt');
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk'); // TODO: Chalk the text.
const print = console.log;

prompt.start()

prompt.get(['book'], function (err, result) {
	let url = 'http://alkitab.mobi/tb/' + result.book

	request(url, function(err, resp, body) {
	    if(!err & resp.statusCode == 200) {
	        const $ = cheerio.load(body);
			const chapter = $('span.style1 strong').eq(-1).text()
			let chapters = [];

	        $('span.style2 a').each(function (i, elm) {
				let raw = $(this).text();
				let firstOne = raw.replace('[', '');
				let secondOne = firstOne.replace(']', '');
				let thirdOne = secondOne.replace(' ', '');
				let fourthOne = thirdOne.replace(',', '');
				let fifthOne = '- ' + fourthOne;

                // TODO: Merge all string manipulation variable into one variable

				chapters.push(fifthOne)
	        });

			if (chapters.length = 0) {
				print('Verses in ' + chapter);

				for (var i = 0; i < chapters.length; i++) {
					print(chapters[i])
				}
			} else {
				print('Chapter name is too long')
			}

	    } else {
			print('Error : ' + err)
		}
	})
})
