
/**
 * Dependencies.
 */

var exec = require('child_process').exec;
var assert = require('assert');
var uid = require('uid');
var Git = require('..');
var fs = require('fs');

/**
 * Tests.
 */

describe('Git()', function(){
  it('should be a function', function(){
    assert.equal(typeof Git, 'function');
  });
  
  it('should be a constructor', function(){
    var git = new Git();
    assert(git instanceof Git);
  });
  
  it('should not require the new keyword', function(){
    var git = Git();
    assert(git instanceof Git);
  });
  
  it('should take options', function(){
    var git = Git({ base: '../' });
    assert(git.base === '../');
  });
});

describe('Git', function(){
  it('should initialize a git repository', function(done){
    var folder = '../' + uid();
    exec('mkdir ' + folder, function(err, res){
      var git = new Git({ base: folder })
        .init()
        .run(function(err, res){
          if (err) throw new Error(err);
          fs.exists(folder + '/.git', function(exists){
            exec('rm -rf ' + folder);
            if (!exists) throw new Error('Repo is not git repository');
            done();
          });
        });
    });
  });
  
  it('should add files to staging area', function(done){
    var folder = '../' + uid();
    exec('mkdir ' + folder, function(){
      exec('touch ' + folder + '/index.js', function(){
        exec('cd ' + folder, function(){
          var git = new Git({ base: folder })
            .init()
            .add('index.js')
            .run(function(err, res){
              if (err) throw new Error('Not added as git repository');
              exec('cd ' + '../git', function(err, res){
                exec('rm -rf ' + folder);
                done();
              });
            });
        });
      });
    });
  });
  
  it('should commit to working tree', function(done){
    var folder = '../' + uid();
    exec('mkdir ' + folder, function(){
      exec('touch ' + folder + '/index.js', function(){
        exec('cd ' + folder, function(){
          var git = new Git({ base: folder })
            .init()
            .add('index.js')
            .commit('-m "test"')
            .run(function(err, res){
              if (err) throw new Error('Not committed to the working tree');
              exec('cd ' + '../git', function(err, res){
                exec('rm -rf ' + folder);
                done();
              });
            })
        });
      });
    });
  });

  // it('should give repo\'s status', function(done){
  //   var folder = '../' + uid();
  //   exec('mkdir ' + folder, function(){
  //     var git = new Git({ base: folder });
  //     git.init(folder, function(){ // this sucks
  //       exec('touch ' + folder + '/index.js', function(){
  //         exec('cd ' + folder, function(){
  //           git.status('--porcelain', function(err, res){
  //             if (err) throw new Error('Status not given');
  //             var keys = Object.keys(res);
  //
  //             assert(keys[0] === 'not_added');
  //             assert(keys[1] === 'deleted');
  //             assert(keys[2] === 'modified');
  //
  //             exec('cd ' + '../git', function(err, res){
  //               exec('rm -rf ' + folder);
  //               done();
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });
});