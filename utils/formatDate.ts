export function formatDate(inputDate) {

  const date = new Date(inputDate);
  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const formattedDate = day + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes;

  return formattedDate;
}