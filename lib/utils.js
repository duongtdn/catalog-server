"use strict"

function localeString(x, sep, grp) {
  const sx = (''+x).split('.');
  let s = ''; 
  let i, j;
  sep || (sep = '.'); // default seperator
  grp || grp === 0 || (grp = 3); // default grouping
  i = sx[0].length;
  while (i > grp) {
      j = i - grp;
      s = sep + sx[0].slice(j, i) + s;
      i = j;
  }
  s = sx[0].slice(0, i) + s;
  sx[0] = s;
  return sx.join('.');
}

function scorePassword(password) {

  let score = 2;     // bias to 2, as score 0 means no password typed

  if (password.length == 0) {
    return 0;                     // no password typed, score is 0
  }
  else if (password.length < 6) {
    score -= 2;                // 1 -5 chars, score will vary from 1 - 4
  } 
  else if (password.length == 6) {
    score -= 1;               // 6 chars, score will vary from 2 - 5
                                 // 7 char, score will vary from 2 - 6
  } 
  else if (password.length > 7 ) {
    score += 1;               // more than 8 chars, strength will vary from 3 - 7
  }

  score += /[a-z]/.test(password) ? 1 : 0;
  score += /[A-Z]/.test(password) ? 1 : 0;
  score += /[0-9]/.test(password) ? 1 : 0;
  score += /\W/.test(password)    ? 1 : 0;

  return score;

} 

module.exports = { localeString, scorePassword }