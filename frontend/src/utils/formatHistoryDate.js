function addMGC(mG) {
  if (mG === "Chest") {
    return "log-group-red";
  } else if (mG === "Back") {
    return "log-group-blue";
  } else if (mG === "Shoulders") {
    return "log-group-purple";
  } else if (mG === "Legs") {
    return "log-group-light-blue";
  } else if (mG === "Biceps") {
    return "log-group-yellow";
  } else if (mG === "Triceps") {
    return "log-group-green";
  } else if (mG === "Abs") {
    return "log-group-black";
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${day}/${month}/${year}`;
}

function formatHistoryDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  return year * 10000 + month * 100 + day;
}

export { addMGC, formatDate, formatHistoryDate };
