
# gity (WIP)

A nice Git wrapper for Node.

## Installation

    $ npm install gity

## Examples

```js
var Git = require('gity');

var git = Git()
  .init()
  .add('index.js')
  .commit('-m "added index.js"')
  .status('--porcelain')
  .run(function(err, res){
    if (err) throw new Error(err);
    console.log(res);
  });
```

```js
var Git = require('gity');

var git = Git({ base: '../repo' })
  .add('*.js')
  .commit('-m "added js files"')
  .run(function(err, res){
    if (err) throw new Error(err);
    console.log(res);
  });
```

## API

### .init()

```js
git.init();
git.init('-q');
```
### .add()

```js
git.add('-A');
git.add('*.js');
git.add('--All');
git.add('index.js');
```

### .checkout()

```js
git.checkout('feature');
git.checkout('-b demo');
```

### .commit()

```js
git.commit('--short');
git.commit('-m "testing"');
```

### .push()

```js
git.push()
git.push('origin master');
git.push('-f origin master');
```

### .status()

```js
git.status() // stdout (e.g. "On branch master\nChanges not staged for commit:...")
git.status('--porcelain'); // { untracked: [], deleted: [], created: [], modified: [] }
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
