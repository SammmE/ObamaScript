#!/usr/bin/env node

/**
 * obama
 * Run or compile ObamaScript file
 *
 * @author SammmE <https://github.com/SammmE>
 */

const fs = require('fs');

const Interpreter = require('../src/interpreter');

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const chalk = require('chalk');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

class FileReadErr extends Error {
	constructor(message) {
		super(message);
		this.name = 'FileReadErr';
	}
}

function checkFileExists(file) {
	return fs.promises
		.access(file, fs.constants.F_OK)
		.then(() => true)
		.catch(() => false);
}

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	let time = flags.time;
	let compile = flags.compile;
	let run = !flags.noRun;

	if (input.length > 0) {
		if (fs.existsSync(input[0])) {
			const interp = new Interpreter(
				fs.readFileSync(input[0]).toString('utf-8')
			);
			if (run) {
				if (time) {
					var startTime = Date.now();
				}
				interp.interpret();
				if (time) {
					totalTime = Date.now() - startTime;
					console.log(
						`${chalk.green('It took ')}${chalk.cyan(
							totalTime.toString()
						)} ${chalk.green('m(s) to run')} ${chalk.cyan(
							input[0]
						)}`
					);
				}
			}
			if (compile) {
				interp.compile();
			}
		} else {
			throw new FileReadErr(`File does not exist: ${input[0]}`);
		}
	} else {
		throw new FileReadErr(
			`File path argumrnt not provided! Arguments: ${input}`
		);
	}
})();
