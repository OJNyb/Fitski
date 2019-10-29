var countDecimals = function(value) {
  if (isNaN(value)) return;
  value = Number(value);
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

function ensureDecimal(number) {
  let num = Number(number);
  if (countDecimals(num) > 2) {
    return num.toFixed(2);
  } else {
    return num.toFixed(1);
  }
}

export { ensureDecimal };
