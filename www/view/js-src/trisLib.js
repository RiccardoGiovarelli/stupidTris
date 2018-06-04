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
 * Function adjustGrid
 *
 * Adjust grafic set of grid
 *
 * @returns no return
 */
export function adjustGrid() {
  // Adjust grid height
  const currentHeight = `${document.getElementById('tris_grid_container').offsetWidth}px`;
  document.getElementById('tris_grid').style.height = currentHeight;

  // Adjust grid font
  const currentGridBoxwidth = document.getElementById('tris_grid').offsetWidth;
  const newFontSize = (currentGridBoxwidth / 10);
  document.getElementById('tris_grid').style.fontSize = `${newFontSize}px`;
}
