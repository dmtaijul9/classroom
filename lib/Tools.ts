export const dateParsing = (date) => {
  const dateObj = new Date(date);
  let year = dateObj.getFullYear();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0");
  let day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
