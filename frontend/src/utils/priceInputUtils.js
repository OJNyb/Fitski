function addCommas(value) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeCommas(value) {
  return value.replace(/,/g, "");
}

export function checkIsValidNumber(input) {
  if (Number(input) < 0 || isNaN(Number(input)) || Number(input) > 1000) {
    return false;
  }

  return true;
}

/**
 * Remove commas and extra decimals from value
 */
export function cleanValue(value, allowDecimals, decimalsLimit) {
  const withoutCommas = removeCommas(value);

  if (withoutCommas.includes(".")) {
    const [int, decimals] = withoutCommas.split(".");
    const includeDecimals = allowDecimals
      ? `.${decimalsLimit ? decimals.slice(0, decimalsLimit) : decimals}`
      : "";

    return `${int}${includeDecimals}`;
  }

  return withoutCommas;
}

/**
 * Format value with commas
 */
export function formatValue(value) {
  const [int, decimals] = value.split(".");
  const includeDecimals = value.includes(".") ? `.${decimals}` : "";
  return `${addCommas(int)}${includeDecimals}`;
}
