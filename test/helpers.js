
/**
 * Module dependencies.
 */

var exec = require('child_process').exec;

exports.setup = function(cb){
  exec('mkdir /tmp/gity', function(){
    exec('touch /tmp/gity/index.js', cb);
  });
};

exports.cleanup = function(cb){
  exec('rm -rf /tmp/gity', cb);
};
