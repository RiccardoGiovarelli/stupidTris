/**
 * Function getCookie
 *
 * Get a cookie from browser
 *
 * @param cname Cookie name
 * @returns cookie content on success, false on failure
 */
export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}


/**
 * Function myLog
 *
 * Print a formatted log
 *
 * @param log The log content to print
 */
export function myLog(log) {
  const currentDate = new Date();
  console.log('________________________________________');
  console.log(`LOG TIME: ${currentDate}`);
  console.log(`LOG CONTENT: ${log}`);
  console.log('________________________________________');
}
