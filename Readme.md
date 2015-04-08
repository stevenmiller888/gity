
# gity (WIP)

A nice Git wrapper for Node.

## Installation

    $ npm install gity

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

var git = Git({ base: '../repo' })
  .init()
  .add('index.js')
  .commit('-m "added index.js"')
  .status('--porcelain')
  .run(function(err, res){
    if (err) throw new Error(err);
    console.log(res);
  });
```

## API

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
git.log('');
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
git.status() // stdout (e.g. "On branch master\nChanges not staged for commit:...")
git.status('--porcelain'); // { untracked: [], deleted: [], created: [], modified: [] }
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
})
```

## License

MIT
