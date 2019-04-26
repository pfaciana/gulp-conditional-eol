'use strict';

var lec = require('line-ending-corrector').LineEndingCorrector,
	path = require('path'),
	through = require('through2'),
	defaults = {
		lineSeparator: 'LF',
		fileEncoding: 'utf8',
		verbose: 'min',
		ext: [
			'cnf', 'conf', 'config', 'css', 'haml', 'htaccess', 'htm', 'html', 'jade', 'js', 'json', 'log',
			'markdown', 'md', 'mustache', 'php', 'pug', 'scss', 'tpl', 'ts', 'txt', 'xhtml', 'xml', 'yml'
		],
		excludeNonMatches: false,
		includeMatches: false,
	},
	PLUGIN_NAME = 'ConditionalEOL',
	CONSOLE_PREFIX = PLUGIN_NAME + ': ';

module.exports = function (opt, appendExt) {
	opt = opt || {};
	opt.lineSeparator = opt.lineSeparator || defaults.lineSeparator;
	opt.fileEncoding = opt.fileEncoding || defaults.fileEncoding;
	opt.verbose = opt.verbose || defaults.verbose;
	opt.ext = opt.ext || defaults.ext;
	appendExt = appendExt || [];

	// Merge default ext and user ext
	if (!Array.isArray(appendExt)) {
		appendExt = [appendExt];
	}

	opt.ext.push.apply(opt.ext, appendExt);

	function stream(file, encoding, callback) {
		var ext = path.extname(file.path).substring(1),
			response, wasAltered, output;

		// If null or file extension does not match
		if (file.isNull() || !opt.ext.includes(ext)) {
			if (!file.isNull() && typeof opt === 'object') {
				if ('verbose' in opt && opt.verbose === true) {
					console.log(CONSOLE_PREFIX + file.path + ' - file extension does not match');
				}
				if ('excludeNonMatches' in opt && opt.excludeNonMatches === true) {
					return callback(null);
				}
			}
			return callback(null, file);
		}

		if (file.isStream()) {
			return callback(CONSOLE_PREFIX + 'Streaming not supported');
		}

		try {
			response = lec.correctSync(file.contents.toString(opt.fileEncoding), {
				verbose: opt.verbose,
				eolc: opt.lineSeparator,
				encoding: opt.fileEncoding
			});
			wasAltered = response[0];
			output = response[1];
			if (wasAltered) {
				if (typeof opt === 'object' && 'verbose' in opt && opt.verbose) {
					console.log(CONSOLE_PREFIX + file.path + ' - CONVERTED TO ' + opt.lineSeparator);
				}
				file.contents = new Buffer(output);
				this.push(file);
			} else {
				if (typeof opt === 'object') {
					if ('verbose' in opt && opt.verbose === true) {
						console.log(CONSOLE_PREFIX + file.path + ' - already is ' + opt.lineSeparator);
					}
					if ('includeMatches' in opt && opt.includeMatches === true) {
						this.push(file);
					}
				}
			}
		} catch (err) {
			return callback(err);
		}

		return callback();
	}

	return through.obj(stream);
};