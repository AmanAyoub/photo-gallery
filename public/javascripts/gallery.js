import templates from "./templates.js";
let API_URL = "http://localhost:3000";
let photos;
let activePhotoIndex;

async function getPhotos() {
  let response = await fetch(API_URL + "/photos");
  let photosData = await response.json();

  return photosData;
}

function setPhotos(photos) {
  let photosDiv = document.getElementById("slides");
  photosDiv.innerHTML = templates.photos(photos);
}

function renderPhotoInfo(photoIndex) {
  let photoId = photos[photoIndex].id;
  let photo = photos.find(photo => photo.id === photoId);
  let infoHeader = document.getElementById("information");
  infoHeader.innerHTML = templates.photoInformation(photo);
}

async function fetchCommentsFor(photoId) {
  let response = await fetch(API_URL + `/comments?photo_id=${photoId}`);
  return await response.json();
}

async function renderCommentsFor(photoIndex) {
  let photoId = photos[photoIndex].id;
  let comments = await fetchCommentsFor(photoId);
  let list = document.querySelector("#comments ul");

  list.innerHTML = templates.comments(comments);
}

function resetSlideshow() {
  setPhotos(photos);
  renderPhotoInfo(activePhotoIndex);
  renderCommentsFor(activePhotoIndex);
}

function handleNextPhoto(event) {
  event.preventDefault();
  activePhotoIndex += 1;
  activePhotoIndex = activePhotoIndex % photos.length;
  resetSlideshow();
}

function handlePreviousPhoto(event) {
  event.preventDefault();
  activePhotoIndex -= 1;
  activePhotoIndex = activePhotoIndex < 0 ? photos.length - 1 : activePhotoIndex;
  resetSlideshow();
}

document.addEventListener("DOMContentLoaded", async event => {
  photos = await getPhotos();
  activePhotoIndex = 0;

  resetSlideshow();


  let prevLink = document.querySelector(".prev");
  let nextLink = document.querySelector(".next");

  nextLink.addEventListener("click", handleNextPhoto);
  prevLink.addEventListener("click", handlePreviousPhoto);
});