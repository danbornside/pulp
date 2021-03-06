var glob = require("glob");

function deps(callback) {
  glob("bower_components/*/src/**/*.purs", {}, callback);
}
module.exports.deps = deps;

function src(callback) {
  glob("src/**/*.purs", {}, callback);
}
module.exports.src = src;

function test(callback) {
  glob("test/**/*.purs", {}, callback);
}
module.exports.test = test;

function resolve(fns, callback) {
  function it(acc, fns, callback) {
    if (!fns.length) {
      callback(null, acc);
    } else {
      fns[0](function(err, res) {
        if (err) {
          callback(err);
        } else {
          it(acc.concat(res), fns.slice(1), callback);
        }
      });
    }
  }
  it([], fns, callback);
}
module.exports.resolve = resolve;
