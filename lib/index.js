
/**
 * Dependencies.
 */

var exec = require('child_process').exec;
var Ware = require('ware');

/**
 * Expose `Git`
 */

module.exports = Git;

/**
 * Git.
 *
 * @param {Object} opts
 */

function Git(opts) {
  if (!(this instanceof Git)) return new Git(opts);
  this.opts = opts || {};
  this.base = this.opts.base || process.cwd();
  this.middleware = Ware();
}

/**
 * Commands.
 */

var commands = [
  'add',
  'branch',
  'checkout',
  'clone',
  'commit',
  'diff',
  'fetch',
  'grep',
  'init',
  'log',
  'mv',
  'pull',
  'push',
  'reset',
  'rm',
  'show',
  'status',
  'tag'
];

/**
 * Run.
 *
 * @param {Function} cb
 */

Git.prototype.run = function (cb){
  this.middleware.run({}, {}, function(err, req, res){
    cb && cb(err, res);
  });
};

/**
 * Attach all the commands.
 */

commands.forEach(function(command){
  Git.prototype[command] = function(opts){
    var self = this;
    
    self.middleware.use(function(req, res, next){
      var cmd = opts ?
        'git ' + command + ' ' + opts :
        'git ' + command;

      exec(cmd, { cwd: self.base }, function(err, stdout){
        if (command === 'status' && opts === '--porcelain') stdout = parseStatus(stdout);
        res.message = stdout || "";
        next(req.err, res.message);
      });
    });

    return self;
  };
});

/**
 * Parse the status
 *
 * @param {String} status
 */

function parseStatus(status){
  var mapping = { '??': 'untracked', 'M': 'modified', 'AM': 'created', 'D': 'deleted' };
  var result = { untracked: [], modified: [], created: [], deleted: [] };
  var lines = status.trim().split('\n');

  lines.forEach(function(line){
    line = line.trim().split(/\s+/);
    var type = line.shift();
    result[mapping[type]].push(line.join());
  });

  return result;
}
