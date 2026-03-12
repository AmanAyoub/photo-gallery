import templates from "./templates.js";
let API_URL = "http://localhost:3000";
let photos;

async function getPhotos() {
  let response = await fetch(API_URL + "/photos");
  let photosData = await response.json();

  return photosData;
}

function setPhotos(photos) {
  let photosDiv = document.getElementById("slides");
  photosDiv.innerHTML = templates.photos(photos);
}

function renderPhotoInfo(photoId) {
  let photo = photos.find(photo => photo.id === photoId);
  let infoHeader = document.getElementById("information");
  infoHeader.innerHTML = templates.photoInformation(photo);
}

async function fetchCommentsFor(photoId) {
  let response = await fetch(API_URL + `/comments?photo_id=${photoId}`);
  return await response.json();
}

async function renderCommentsFor(photoId) {
  let comments = await fetchCommentsFor(photoId);
  let list = document.querySelector("#comments ul");

  list.innerHTML = templates.comments(comments);
}

document.addEventListener("DOMContentLoaded", async event => {
  photos = await getPhotos();
  let activePhotoId = photos[0].id;

  setPhotos(photos);
  renderPhotoInfo(activePhotoId);
  renderCommentsFor(activePhotoId);

});