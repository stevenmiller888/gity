
# gity
[![NPM version][npm-image]][npm-url]
[![build status][circle-image]][circle-url]
[![license][license-image]][license-url]

> A nice Git wrapper for Node.

```bash
npm install gity
```

## Features
  - Simple, chainable API
  - Small and only one dependency
  - Supports all of the most common git commands
  - By default, provides nicely parsed output from commands like `status` and `log`

## Examples

```js
var Git = require('gity');

var git = Git()
  .add('*.js')
  .commit('-m "added js files"')
  .run();
```

```js
var Git = require('gity');

var git = Git()
  .add('*.js')
  .commit('-m "added js files"')
  .status()
  .run(function(err, res){
    // ... { untracked: [], modified: [], created: [], deleted: [] };
  });
```

```js
var Git = require('gity');

var git = Git({ pretty: false }) // passes stdout into res
  .add('*.js')
  .commit('-m "added js files"')
  .status()
  .run(function(err, res){
    // ...
  });
```

```js
var Git = require('gity');

var git = Git({ base: '../repo' }) // sets the base folder to '../repo'
  .init()
  .run(function(err, res){
    // ...
  });
```

## API

### Git(options)

Create a new instance of Gity.

The available options are:

- `base`: set the base folder to run the command from, default `process.cwd()`.
- `pretty`: give pretty output instead of stdout, default `true`.

### .add()

```js
git.add('-A');
git.add('*.js');
git.add('--All');
git.add('index.js');
```

### .bisect()

```js
git.bisect('start');
git.bisect('bad');
git.bisect('good');
```

### .branch()

```js
git.branch(); // (e.g. 'master')
git.branch('-D feature');
```

### .checkout()

```js
git.checkout('feature');
git.checkout('-b demo');
```

### .clone()

```js
git.clone('git://git.kernel.org/pub/scm/.../linux.git my-linux');
```

### .commit()

```js
git.commit('--short');
git.commit('-m "testing"');
```

### .diff()

```js
git.diff('topic master');
git.diff('Readme.md package.json');
git.diff('git diff --name-status');
```

### .fetch()

```js
git.fetch();
git.fetch('origin');
```

### .grep()

```js
git.grep("'time_t' -- '*.[ch]'");
```

### .init()

```js
git.init();
git.init('-q');
```

### .log()

```js
git.log();
git.log('git log --no-merges');
git.log('git log --since="2 weeks ago" -- gitk');
```

### .merge()

```js
git.merge('origin/next');
```

### .mv()

```js
git.mv('oldname newname');
```

### .pull()

```js
git.pull();
git.pull('origin master');
```

### .push()

```js
git.push()
git.push('origin master');
git.push('-f origin master');
```

### .rebase()

```js
git.rebase('master');
git.rebase('--onto master next topic');
```

### .reset()

```js
git.reset();
git.reset('--soft HEAD^');
git.reset('--hard HEAD~3');
```

### .rm()

```js
git.rm('oldname');
```

### .show()

```js
git.show('--pretty="format:" --name-only bd61ad98');
```

### .status()

```js
git.status();
git.status('--porcelain');
```

### .tag()

```js
git.tag('-d X');
```

### .run()

```js
git.run();
git.run(function(err, res){
  if (err) throw err;
  console.log(res);
});
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/gity.svg?style=flat-square
[npm-url]: https://npmjs.org/package/gity
[circle-image]: https://img.shields.io/circleci/project/stevenmiller888/gity.svg
[circle-url]: https://circleci.com/gh/stevenmiller888/gity
[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: https://tldrlegal.com/license/mit-license