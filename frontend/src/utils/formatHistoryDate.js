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

function reverseHistoryDate(date) {
  date += "";
  let year = date.slice(0, 4);
  let month = date.slice(4, 6);
  let day = date.slice(6, 8);

  return new Date(year, month, day);
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

function displayDateWeekday(date) {
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
  const weekday = date.toLocaleString("default", { weekday: "long" });

  if (nDate.slice(0, 4) === fDate.slice(0, 4)) {
    return `${weekday}, ${month} ${day}`;
  } else {
    const year = date.getFullYear();
    return `${weekday}, ${month} ${day}, ${year}`;
  }
}

function isSameDay(date1, date2) {
  let y1 = date1.getFullYear();
  let y2 = date2.getFullYear();
  if (y1 !== y2) return false;
  let m1 = date1.getMonth();
  let m2 = date2.getMonth();
  if (m1 !== m2) return false;
  let d1 = date1.getDate();
  let d2 = date2.getDate();
  if (d1 !== d2) return false;

  return true;
}

export {
  addMGC,
  isSameDay,
  formatDate,
  displayDate,
  decrementDate,
  incrementDate,
  formatHistoryDate,
  displayDateWeekday,
  reverseHistoryDate
};
