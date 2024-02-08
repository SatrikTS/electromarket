export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export function setCookie(name: string, value :string | number, expireHours: number) {
  const date = new Date();
  date.setTime(date.getTime() + (expireHours * 60 * 60 * 1000));

  let expires = "expires="+ date.toUTCString();

  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}