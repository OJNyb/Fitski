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

module.exports = { formatHistoryDate, reverseHistoryDate };
