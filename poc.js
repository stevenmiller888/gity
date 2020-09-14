var Git = require('./');
 
var git = Git()
  .add('*.js')
  .commit('-m "added js files";touch HACKED;#')
  .run();
