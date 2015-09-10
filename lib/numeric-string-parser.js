module.exports = function parseNumericString(str) {
  var numbersRx = /\b(?:(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|(ten)|(eleven)|(twelve)|(?:(?:(thir)|(four)|(fif)|(six)|(seven)|(eigh)|(nine))teen)|(?:(?:(twen)|(thir)|(fou?r)|(fif)|(six)|(seven)|(eigh)|(nine))ty)|(negative)|(hundred)|(thousand)|(?:(?:(mi)|(bi)|(tri)|(quadri)|(quinti)|(sexti)|(septi)|(octi)|(noni)|(deci))llion))\b/gi;
  var total = 0;
  var part  = 0;
  var sign  = 1;
  var match;
  var i;
  var l;
  var power;

  while (match = numbersRx.exec(str)) {
    for (i = 0, l = match.length; i < l; i++) {
      if (!match[i]) { continue; }

      // 1-19
      if (i < 20) {
        part += i;

      // 20, 30..90
      } else if (i < 28) {
        part += 10 + 10 * (i - 19);

      // } else if (i === 28) {
      //   sign *= -1;

      // hundred
      } else if (i === 29) {
        part *= 100;

      // thousand-decillion
      } else {
        power = Math.pow(1000, i - 29);

        // e.g. million ... thousand
        if (total > power) {
          total += part * power;

        // e.g. thousand ... million
        } else {
          total += part;
          total *= power;
        }

        part = 0;
      }
    }
  }

  return sign * (total + part);
};
