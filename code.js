;(function(exports) {

  // reduce
  (function() {
    if (Array.prototype.reduce === undefined) {
      Array.prototype.reduce = function(f, acc) {
        if (acc === undefined && this.length === 0)
          throw TypeError("Reduce of empty array with no initial value");
        if (acc === undefined && this.length !== 0) return this.reduce(f, this[0]);
        if (this.length === 0) return acc;
        return this.slice(1).reduce(f, f(acc, this[0]));
      };
    }
  })();

  // map
  (function() {
    if (Array.prototype.map === undefined) {
      Array.prototype.map = function(f) {
        return this.reduce(function(acc, x) {
          return acc.concat([f(x)]);
        }, []);
      };
    }
  })();

  var chain = function() {
    return Array.prototype.slice.call(arguments).reduce(function(acc, x) {
      return function(input) {
        return x(acc(input));
      };
    });
  };

  console.log(chain(square, square, square, sum)([0, 1, 2, 3, 4]));
})(this);
