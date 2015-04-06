
# git (WIP)

A nice Git wrapper for Node.

## Installation

  $ npm install git-wrapper

## Examples

```js
var Git = require('git-wrapper');

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
var Git = require('git-wrapper');

var git = Git({ base: '../repo' })
  .add('*.js')
  .commit('-m "added js files"')
  .run(function(err, res){
    if (err) throw new Error(err);
    console.log(res);
  });
```

## API

### Init

```js
git.init();
git.init('-q');
```
### Add

```js
git.add('-A');
git.add('*.js');
git.add('--All');
git.add('index.js');
```

### Commit

```js
git.commit('--short');
git.commit('--porcelain');
git.commit('-m "testing"');
```

### Run

```js
git.run();
git.run(function(err, res){
  if (err) throw err;
  console.log(res);
})
```

## License

MIT
