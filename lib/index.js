
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
 * Run.
 *
 * @param {Function} cb
 */

Git.prototype.run = function (cb){
  this.middleware.run({}, {}, function(err, req, res){
    cb(err, res);
  });
};

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
        res.message = stdout || "";
        next(req.err, res.message);
      });
    });
    
    return self;
  };
});
