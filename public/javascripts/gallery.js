import templates from "./templates.js";
let API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async event => {
  async function photosTemplate() {
    let response = await fetch(API_URL + "/photos");
    let photosData = await response.json();

    return templates.photos(photosData);
  }

  let photos = await photosTemplate();
  let photosDiv = document.getElementById("slides");
  photosDiv.innerHTML = photos;
  console.log(photosDiv);
});