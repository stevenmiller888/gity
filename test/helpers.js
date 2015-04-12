
/**
 * Module dependencies.
 */

var exec = require('child_process').exec;

/**
 * Set up the git repository.
 *
 * @param {Function} cb
 */

exports.setup = function(cb){
  exec('mkdir /tmp/gity', function(){
    exec('touch /tmp/gity/index.js', cb);
  });
};

/**
 * Clean up the git repository.
 *
 * @param {Function} cb
 */

exports.cleanup = function(cb){
  exec('rm -rf /tmp/gity', cb);
};
