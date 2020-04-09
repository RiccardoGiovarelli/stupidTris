// This file is part of Stupid Tris.

// Stupid Tris is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Stupid Tris is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Stupid Tris.  If not, see <http://www.gnu.org/licenses/>.

// Copyright 2020 Riccardo Giovarelli <riccardo.giovarelli@gmail.com>

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
