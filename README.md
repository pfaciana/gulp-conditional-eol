# gulp-conditional-eol

Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings) 

# about gulp-conditional-eol

It converts all those pesky `\r\n` (a.k.a `CRLF`) line endings in Microsoft Windows operating systems into the more commonly used and recognized `\n` (a.k.a `LF`). Though it lets you do the opposite as well ( converting `LF` to `CRLF` ). It supports `\r` (a.k.a `CR`) as well for the sake of completion.

You should definitely have this in your build process especially if someone in your team works from a non UNIX system.


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
	verbose: 'min', 
	lineSeparator: 'LF', 
	fileEncoding: 'utf8', 
	ext: ['scss','css','js']
}, ['additionalExt1','additionalExt2']))
```

## First Parameter: Options (object)

`verbose`
Accepts 'min', true or false. 'min' only shows updated files, true shows all, false hides all. Default 'min'

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

## Second Parameter: appendExt (string or array)

Additional file extensions to add to the defaults. Default [] (empty)


