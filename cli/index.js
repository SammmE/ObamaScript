#!/usr/bin/env node

/**
 * obama
 * Run or compile ObamaScript file
 *
 * @author SammmE <https://github.com/SammmE>
 */

const Interpreter = 

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	let time = flags.time;
	let compile = flags.compile;

	if (time) {
		let startTime = Date.now();
	}
	const interp = new Interpreter();
})();
