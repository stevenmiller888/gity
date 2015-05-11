
/**
 * Dependencies.
 */

var exec = require('child_process').exec;
var helpers = require('./helpers');
var assert = require('assert');
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

  it('should allow a base option', function(){
    var git = Git({ base: '../' });
    assert(git.base === '../');
  });

  it('should default pretty option to true', function(){
    var git = Git();
    assert(git.pretty);
  });

  it('should allow pretty option to be false', function(){
    var git = Git({ pretty: false });
    assert(!git.pretty);
  });
});

describe('Git', function(){
  var folder = '/tmp/gity';
  var git;

  beforeEach(function(done){
    helpers.setup(function(){
      git = new Git({ base: folder });
      done();
    });
  });

  afterEach(function(done){
    helpers.cleanup(done);
  });

  it('should initialize a git repository', function(done){
    git
      .init()
      .run(function(err, res){
        if (err) throw new Error(err);
        fs.exists(folder + '/.git', function(exists){
          assert(exists);
          done();
        });
      });
  });

  it('should add files to staging area', function(done){
    git
      .init()
      .add('index.js')
      .run(function(err, res){
        if (err) throw new Error(err);
        done();
      });
  });

  it('should commit to working tree', function(done){
    git
      .init()
      .add('index.js')
      .commit('-m "test"')
      .run(function(err, res){
        if (err) throw new Error(err);
        done();
      })
  });

  it('should give repo\'s pretty status', function(done){
    git
      .init()
      .status()
      .run(function(err, res){
        if (err) throw new Error(err);
        var keys = Object.keys(res);
        assert(keys[0] === 'untracked');
        assert(keys[1] === 'modified');
        assert(keys[2] === 'created');
        assert(keys[3] === 'deleted');
        done();
      });
  });

  it('should give repo\'s stdout status', function(done){
    new Git({ base: folder, pretty: false })
      .init()
      .status()
      .run(function(err, res){
        if (err) throw new Error(err);
        var msg1 = 'nothing added to commit but untracked files present';
        var msg2 = 'use "git add <file>..." to include in what will be';
        assert(res.indexOf(msg1) !== -1 || res.indexOf(msg2) !== -1);
        done();
      });
  });
  
  it('should give the pretty log', function(done){
    git
      .init()
      .add('index.js')
      .commit('-m "test"')
      .log()
      .run(function(err, res){
        if (err) throw new Error(err);
        var hash = Object.keys(res)[0];
        assert(res[hash].author);
        done();
      });
  });
});