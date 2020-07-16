// Generated by CoffeeScript 1.12.7
(function() {
  var MathExtensions, RegExpExtensions, abs, ceil, float32Precision, float64Precision, floor, inverseFloat64Precision, inverstFloat32Precision, log10, max, min, numberRegexp, onePlusFloat32Precision, onePlusFloat64Precision, pow, random, ref, round;

  RegExpExtensions = require('./RegExpExtensions');

  numberRegexp = RegExpExtensions.numberRegexp;

  float64Precision = 4e-16;

  float32Precision = 4e-7;

  onePlusFloat64Precision = 1 + float64Precision;

  onePlusFloat32Precision = 1 + float32Precision;

  inverseFloat64Precision = 1 / float64Precision;

  inverstFloat32Precision = 1 / float32Precision;

  ref = self.Math, abs = ref.abs, min = ref.min, max = ref.max, ceil = ref.ceil, floor = ref.floor, round = ref.round, random = ref.random, pow = ref.pow;

  if (Math.log2 == null) {
    Math.log2 = function(x) {
      return Math.log(x) / Math.LOG2E;
    };
  }

  log10 = Math.log10 != null ? Math.log10 : Math.log10 = function(x) {
    return Math.log(x) / Math.log(10);
  };

  module.exports = MathExtensions = (function() {
    var bound, float32Eq, float32Eq0, floatEq, floatEq0;

    function MathExtensions() {}

    MathExtensions.nearInfinity = pow(10, 100);

    MathExtensions.nearInfinityResult = pow(10, 50);

    MathExtensions.float32Precision = float32Precision;

    MathExtensions.float64Precision = float64Precision;

    MathExtensions.modulo = function(a, b) {
      var r;
      r = a % b;
      if (r < 0) {
        return r + b;
      } else {
        return r;
      }
    };

    MathExtensions.stringToNumberArray = function(string) {
      var a, i, j, len, match, v;
      a = string.split(",");
      for (i = j = 0, len = a.length; j < len; i = ++j) {
        v = a[i];
        match = v.match(numberRegexp);
        a[i] = match != null ? match[0] - 0 : 0;
      }
      return a;
    };

    MathExtensions.numberToTightString = function(n, decimalPrecision) {
      var v;
      if (decimalPrecision == null) {
        decimalPrecision = 16;
      }
      v = n.toPrecision(decimalPrecision);
      if (/e/.test(v)) {
        return v.replace(/([0-9]+(\.[0-9]+[1-9])?)\.?0+e/, "$1e");
      } else {
        return v.replace(/([0-9]+(\.[0-9]+[1-9])?)\.?0+$/, "$1");
      }
    };

    MathExtensions.minMagnitude = function(a, magnitude) {
      if (a < 0) {
        return min(a, -magnitude);
      } else {
        return max(a, magnitude);
      }
    };

    MathExtensions.maxMagnitude = function(a, magnitude) {
      return bound(-magnitude, a, magnitude);
    };

    MathExtensions.maxChange = function(newValue, oldValue, maxChangeV) {
      return bound(oldValue - maxChangeV, newValue, oldValue + maxChangeV);
    };

    MathExtensions.bound = bound = function(a, b, c) {
      if (isNaN(b)) {
        return a;
      }
      if (b < a) {
        return a;
      } else if (b > c) {
        return c;
      } else {
        return b;
      }
    };

    MathExtensions.absGt = function(a, b) {
      return abs(a) > abs(b);
    };

    MathExtensions.absLt = function(a, b) {
      return abs(a) < abs(b);
    };

    MathExtensions.absGte = function(a, b) {
      return abs(a) >= abs(b);
    };

    MathExtensions.absLte = function(a, b) {
      return abs(a) <= abs(b);
    };

    MathExtensions.abs = abs;

    MathExtensions.min = min;

    MathExtensions.max = max;

    MathExtensions.ceil = function(v, m) {
      if (m == null) {
        m = 1;
      }
      return ceil(v / m) * m;
    };

    MathExtensions.floor = function(v, m) {
      if (m == null) {
        m = 1;
      }
      return floor(v / m) * m;
    };

    MathExtensions.round = function(v, m) {
      if (m == null) {
        m = 1;
      }
      return round(v / m) * m;
    };

    MathExtensions.simplifyNum = function(num) {
      return round(num * inverseFloat64Precision) * float64Precision;
    };

    MathExtensions.floatEq = floatEq = function(n1, n2) {
      if (n1 === n2 || abs(n1 - n2) < float64Precision) {
        return true;
      } else if (n1 * n2 > 0) {
        n1 = abs(n1);
        n2 = abs(n2);
        return (n1 * onePlusFloat64Precision > n2) && (n2 * onePlusFloat64Precision > n1);
      } else {
        return false;
      }
    };

    MathExtensions.floatGte = function(a, b) {
      return a >= b || floatEq(a, b);
    };

    MathExtensions.floatLte = function(a, b) {
      return a <= b || floatEq(a, b);
    };

    MathExtensions.floatGt = function(a, b) {
      return a > b && !floatEq(a, b);
    };

    MathExtensions.floatLt = function(a, b) {
      return a < b && !floatEq(a, b);
    };


    /*
    WARNING: if you are working with very small, near-zero numbers, and
      don't want them be be considered actually 0, don't use this!
    
    OUT:
      true if two floating point numbers are within
      'floating-point error' of each other.
    
    What does that mean?
    
    For exponents > 0
      They are the same if their exponent is the same and their mantisssas
      are very close.
    
    For exponents < 0
      HOWEVER, negative-exponent numbers are compared using their
      full value. That means theit exponents could be very different.
    
      return true iff abs(a - b) < float32Precision
    
    NOTES
      The problem is comparing against 0. Since "0" has no magnitude, we
      have to define how we compare when one of the two numbers is 0 and
      the other isn't.
    
      Option 1: always not-equal
      Option 2: equal if the mantissa is near-zero
      Option 3: equal if the value, including exponent, is near-zero
        i.e. - use float32Eq0
    
      I've basically chosen Option #3.
    
      To maintain maximum consistency, I've decided ALL numbers with
      exponents < 0 will be compared without compensating for their magnitudes.
     */

    MathExtensions.float32Eq = float32Eq = function(n1, n2) {
      if (n1 === n2 || abs(n1 - n2) < float32Precision) {
        return true;
      } else {
        n1 = Math.abs(n1);
        n2 = Math.abs(n2);
        return (n1 * onePlusFloat32Precision > n2) && (n2 * onePlusFloat32Precision > n1);
      }
    };

    MathExtensions.float32Gte = function(a, b) {
      return a >= b || float32Eq(a, b);
    };

    MathExtensions.float32Lte = function(a, b) {
      return a <= b || float32Eq(a, b);
    };

    MathExtensions.float32Gt = function(a, b) {
      return a > b && !float32Eq(a, b);
    };

    MathExtensions.float32Lt = function(a, b) {
      return a < b && !float32Eq(a, b);
    };

    MathExtensions.floatEq0 = floatEq0 = function(n) {
      return n === 0 || float64Precision > abs(n);
    };

    MathExtensions.float32Eq0 = float32Eq0 = function(n) {
      return n === 0 || float32Precision > abs(n);
    };

    MathExtensions.floatTrue0 = function(n) {
      if (n === 0 || float64Precision > abs(n)) {
        return 0;
      } else {
        return n;
      }
    };

    MathExtensions.float32True0 = function(n) {
      if (n === 0 || float32Precision > abs(n)) {
        return 0;
      } else {
        return n;
      }
    };

    MathExtensions.random = random;

    MathExtensions.intRand = function(max) {
      return random() * max | 0;
    };

    MathExtensions.boolRand = function() {
      return random() < .5;
    };

    MathExtensions.iPart = function(v) {
      return v - (v % 1);
    };

    MathExtensions.fPart = function(v) {
      return v % 1;
    };

    MathExtensions.commaize = function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    MathExtensions.cyclingSequenceFunction = function(sequence) {
      var sequencePos;
      sequencePos = sequence.length;
      return function() {
        sequencePos++;
        if (sequencePos >= sequence.length) {
          sequencePos = 0;
        }
        return sequence[sequencePos];
      };
    };

    MathExtensions.seededRandomNumberGenerator = function(seed) {
      var _rngSeed;
      if (seed == null) {
        seed = Math.random();
      }
      _rngSeed = Math.floor(48271 * 48271 * Math.abs(seed) + 1);
      return function() {
        return (_rngSeed = _rngSeed * 48271 % 2147483647) / 2147483648;
      };
    };

    return MathExtensions;

  })();

}).call(this);