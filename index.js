#!/usr/bin/env node

const prompt = require('prompt');
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const print = console.log;
const date = new Date();
const tommorow = (date.getMonth() + 1) + '-' + (date.getDate() + 1);

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
				let cleanStr = raw.replace('[', '').replace(']', '').replace(' ', '').replace(',', '');
				let listedStr = '- ' + chalk.blue(cleanStr);

				chapters.push(listedStr)
	        });

			if (chapters.length != 0) {
				print('Verses in ' + chalk.red(chapter));

				for (var i = 0; i < chapters.length; i++) {
					print(chapters[i])
				}

				print('\n' + chalk.red(tommorow))

			} else {
				print(chalk.red('Chapter name is too long'))
			}

	    } else {
			print(chalk.red('Error, somehow. \n Error : ' + err))
		}
	})
})
