function getDisplayUnits(unit, defaultUnit, capitalize) {
  let firstRowUnit;

  if (unit === "w+r" || unit === "w+s" || unit === "w+r+rpe") {
    if (capitalize) {
      firstRowUnit = `WEIGHT (${defaultUnit})`;
    } else firstRowUnit = defaultUnit;
  } else {
    firstRowUnit = null;
  }

  let lastRowUnit;
  if (unit === "s" || unit === "w+s") {
    lastRowUnit = "seconds";
  } else if (unit === "r" || unit === "r+w") {
    lastRowUnit = "reps";
  } else if (unit === "w") {
    lastRowUnit = defaultUnit;
  } else {
    lastRowUnit = "reps";
  }
  if (capitalize) {
    if (unit !== "w") {
      lastRowUnit = lastRowUnit.toUpperCase();
    } else {
      unit = `WEIGHT (${defaultUnit})`;
    }
  }

  let rpeRow;
  if (unit === "w+r+rpe") {
    rpeRow = true;
  }

  return { firstRowUnit, lastRowUnit, rpeRow };
}

export { getDisplayUnits };
