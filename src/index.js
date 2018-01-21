#!/usr/bin/env node

const request = require('request');
const cheerio = require('cheerio');
const print = console.log;

function getChapters(chapter) {
	let url = 'http://alkitab.mobi/tb/' + chapter;

	request(url, function(err, resp, body) {
		if (!err & resp.statusCode == 200) {
			const $ = cheerio.load(body);
			const chapter = $('span.style1 strong').eq(-1).text()
			let chapters = [];

			$('span.style2 a').each(function (i) {
				let raw = $(this).text();
				let cleanStr = raw.replace('[', '').replace(']', '').replace(' ', '').replace(',', '');

				chapters.push(cleanStr)
			});

			if (chapters.length != 0) {
				print('Verses in ' + chapter + '\n');

				for (var i = 0; i < chapters.length; i++) {
					print(chapters[i])
				}

			} else {
				print('An error happened.')
			}
		} else {
			print('Error. \n Error : ' + err)
		}
	})
}

module.exports = getChapters;