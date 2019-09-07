# gulp-conditional-eol

A gulp plugin to make line endings consistent across files in a project. 

# about gulp-conditional-eol

The module uses [iShafayet/line-ending-corrector](https://github.com/iShafayet/line-ending-corrector) under the hood while providing some additional functionality.

You can get a good summary directly from [iShafayet/line-ending-corrector's README.md](https://github.com/iShafayet/line-ending-corrector/blob/master/README.md)

> It converts all those pesky `\r\n` (a.k.a `CRLF`) line endings in Microsoft Windows operating systems into the more commonly used and recognized `\n` (a.k.a `LF`). Though it lets you do the opposite as well ( converting `LF` to `CRLF` ). It supports `\r` (a.k.a `CR`) as well for the sake of completion.

> You should definitely have this in your build process especially if someone in your team works from a non UNIX system.


# Usage

requiring it. the condEOL variable itself is a function.

```node
condEOL = require('gulp-conditional-eol')
```

simplest version

```node
.pipe(condEOL())
```

with all options

```node
.pipe(condEOL({
	lineSeparator: 'LF', 
	fileEncoding: 'utf8', 
	ext: ['scss','css','js'],
	excludeNonMatches: true,
	includeMatches: false,
	verbose: 'min', 
}, ['additionalExt1','additionalExt2']))
```

## First Parameter: Options (object)

`lineSeparator`
Desired End of Line character. can be `CR` (`\r`), `LF`(`\n`). Default `LF`(`\n`)

`encoding`
Any meaningful encoding that nodejs supports. Default `utf8`

`ext`
An array of all the file extensions to check (replaces existing defaults). 
Default [
'cnf', 'conf', 'config', 'css', 'haml', 'htaccess', 'htm', 'html', 'jade', 'js', 'json', 'log',
'markdown', 'md', 'mustache', 'php', 'pug', 'scss', 'tpl', 'ts', 'txt', 'xhtml', 'xml', 'yml'
]

`excludeNonMatches`
Prevents files with extensions that are not matched in `ext` option to be passed through the pipe. Defaults to 'false'

`includeMatches`
Allow files with extensions that are matched in `ext` option to be passed through the pipe when they already have the correct line endings. Defaults to 'false'

`verbose`
Accepts 'min', true or false. 'min' only shows updated files, true shows all, false hides all. Default 'min'

## Second Parameter: appendExt (string or array)

Additional file extensions to add to the defaults. Default [] (empty)


