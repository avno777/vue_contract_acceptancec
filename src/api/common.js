export const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${month},${day},${year}`;
  return formattedDate;
};

export const convertDateToTimestamp = (dateString) => {
  const timestamp = Date.parse(dateString);
  if (!isNaN(timestamp)) {
    return Math.floor(timestamp / 1000);
  } else {
    return null;
  }
};
