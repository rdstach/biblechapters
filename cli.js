#!/usr/bin/env node

const api = require('./index.js')
const prompt = require('prompt');
const print = console.log;

prompt.start()

prompt.get(['book'], function (err, result) {
	let final = api(result.book);
	return final;
})
