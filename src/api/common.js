export const formatTimestampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(date.getDate()).padStart(2, "0");

  // You can adjust the format as needed (e.g., 'yyyy-mm-dd')
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
