
/**
 * Dependencies.
 */

var exec = require('child_process').exec;

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
  opts = opts || {};

  this.queue = [];
  this.base = opts.base || process.cwd();
  this.pretty = typeof opts.pretty !== 'undefined' ? opts.pretty : true;
}

/**
 * Commands.
 */

var commands = [
  'add',
  'bisect',
  'branch',
  'checkout',
  'clone',
  'commit',
  'diff',
  'fetch',
  'grep',
  'init',
  'log',
  'merge',
  'mv',
  'pull',
  'push',
  'rebase',
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

Git.prototype.run = function(cb){
  var self = this;

  function next(err, res){
    if (err) return cb && cb(err);
    var fn = self.queue.shift();
    if (!fn) return cb && cb(err, res)
    fn.call(self, next);
  }

  next();
};

/**
 * Attach the commands.
 */

commands.forEach(function(command){
  Git.prototype[command] = function(opts){
    var base = this.base;
    var pretty = this.pretty;

    var cmd = 'git ' + command;
    if (opts) cmd += ' ' + opts;
    if (pretty) cmd += before(command);

    this.queue.push(function(cb){
      exec(cmd, { cwd: base }, function(err, stdout){
        if (!pretty) return cb(err, stdout);
        cb(err, after(command, stdout));
      });
    });

    return this;
  };
});

/**
 * Before executing the command, add options.
 *
 * @param {String} command
 */

function before(command){
  switch (command) {
    case 'status':
      return ' --porcelain';
      break;
    case 'log':
      return ' --pretty="format:%Creset %H - %an - %s"';
    default:
      return "";
      break;
  }
}

/**
 * After executing the command, parse the output.
 *
 * @param {String} command
 * @param {String} output
 */

function after(command, output){
  var ret = {};

  switch (command) {
    case 'status':
      var statuses = { '??': 'untracked', M: 'modified', AM: 'created', D: 'deleted' };

      for (var status in statuses) {
        var type = statuses[status];
        ret[type] = [];
      }

      lines(output, function(line){
        line = line.trim().split(/\s+/);
        var type = line.shift();
        var name = statuses[type];
        name && ret[name] && ret[name].push(line.join());
      });

      break;
    case 'branch':
      lines(output, function(line){
        if (line.indexOf('*') !== -1) ret = line.slice(2);
      });

      break;
    case 'log':
      lines(output, function(line){
        var parts = line.trim().split('-');

        var hash = parts[0];
        var author = parts[1];
        var message = parts[2];
        
        ret[hash] = {author: author.trim(), message: message.trim() };
      });

      break;
    default:
      return output;
  }

  return ret;
}

/**
 * Pass each output line into a callback.
 *
 * @param {String} output
 * @param {Function} cb
 */

function lines(output, cb){
  output.trim().split('\n').forEach(function(line){
    cb(line);
  });
}
