const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	time: {
		type: 'boolean',
		default: false,
		alias: 't',
		desc: 'Time the script'
	},
	compile: {
		type: 'boolean',
		default: false,
		alias: 'c',
		desc: 'Compile the script'
	},
	noRun: {
		type: 'boolean',
		default: false,
		alias: 'r',
		desc: "Don't run the code"
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `obama`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
