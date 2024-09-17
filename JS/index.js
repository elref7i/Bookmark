'use strict';
let nameInput = document.getElementById('site-name');

let urlInput = document.getElementById('site-url');

let tableData = document.getElementById('tableData');

let messageValidation = document.getElementById('messageValidation');

let closeHint = document.getElementById('closeHint');

let nameRegex = /^[a-zA-Z _-]{3,20}$/;
let urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

let allBookmark = JSON.parse(localStorage.getItem('allBookmark')) || [];
displayAllBookmark();

function addBoomark() {
  if (validtion(nameRegex, nameInput) && validtion(urlRegex, urlInput)) {
    let bookmark = {
      bookmarkName: nameInput.value,
      websireUrl: urlInput.value,
    };
    allBookmark.push(bookmark);
    localStorage.setItem('allBookmark', JSON.stringify(allBookmark));
    displayBookmark(allBookmark.length - 1);
    clearInput();
  } else {
    messageValidation.classList.remove('d-none');
  }
}

function clearInput() {
  nameInput.value = '';
  urlInput.value = '';
  nameInput.classList.remove('is-valid');
  urlInput.classList.remove('is-valid');
}
// * display last bookmark
function displayBookmark(index) {
  let mark = `
  <tr>
    <td>${index + 1}</td>
    <td>${allBookmark[index].bookmarkName}</td>
    <td>
      <a href="${allBookmark[index].websireUrl}"
        class="btn btn-visit  border-0 p-2  fs-6  text-nowrap" target="_blank">
      <i class="fa-solid fa-eye fs-5"></i>
      Visit</a>
    </td>
    <td>
      <button class=" btn btn-danger border-0 px-2 fs-6 text-nowrap" onclick="deleteBookmark(${index})">
      <i class="fa-solid fa-trash-can text-light fs-5" ></i>
      Delete</button>
    </td>
  </tr>
  `;
  tableData.innerHTML += mark;
}
function displayAllBookmark() {
  for (let i = 0; i < allBookmark.length; i++) {
    displayBookmark(i);
  }
}
function deleteBookmark(deleteIndex) {
  allBookmark.splice(deleteIndex, 1);
  localStorage.setItem('allBookmark', JSON.stringify(allBookmark));
  tableData.innerHTML = '';
  displayAllBookmark();
}

function validtion(regex, ele) {
  if (regex.test(ele.value)) {
    ele.classList.add('is-valid');
    ele.classList.remove('is-invalid');
    return true;
  }
  ele.classList.remove('is-valid');
  ele.classList.add('is-invalid');
  return false;
}

function closeWindowHint() {
  messageValidation.classList.add('d-none');
}
