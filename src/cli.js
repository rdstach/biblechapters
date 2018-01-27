#!/usr/bin/env node

const prompt = require('prompt');
const api = require('./index.js');
const print = console.log;

prompt.start();

prompt.get(['book'], function (err, result) {
	if (!err) {
		var final = api(result.book);
	} else {
		print('Error : ', err);
	}
	return final;
});
