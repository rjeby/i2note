export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formateISO8601Date = (date: string) => {
  const d = new Date(date);
  const day = d.getDate().toString();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day.length === 1 ? `0${day}` : day} ${month} ${year}`;
};
