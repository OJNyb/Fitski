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

function decrementDate(date) {
  return date.setDate(date.getDate() - 1);
}

function incrementDate(date) {
  return date.setDate(date.getDate() + 1);
}

function displayDate(date) {
  let fDate = formatHistoryDate(date);
  let nDate = formatHistoryDate(new Date());

  if (nDate === fDate) {
    return "Today";
  } else if (nDate === fDate + 1) {
    return "Yesterday";
  } else if (nDate === fDate - 1) {
    return "Tomorrow";
  }

  fDate += "";
  nDate += "";

  let day = fDate.slice(6);
  if (day < 10) {
    day = day.slice(1);
  }
  const month = date.toLocaleString("default", { month: "long" });
  if (nDate.slice(0, 4) === fDate.slice(0, 4)) {
    return `${month} ${day}`;
  } else {
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
}

export {
  addMGC,
  formatDate,
  displayDate,
  decrementDate,
  incrementDate,
  formatHistoryDate
};
