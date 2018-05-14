'use strict';
// часть первая
var i;
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var obj;
var arr = [];
var galleryOverlay = document.querySelector('.gallery-overlay');
var picturesTemplate = document.querySelector('#picture-template').content;
var  pictures = document.querySelector('.pictures ');

// рандомное значение из массива.
function randonElement(rand) {
  var randElem = [Math.floor(Math.random() * rand.length)];
  return rand[randElem];
}
// рандомное число min max.
function randomInteger(min, max) {
  var randInt = min - 0.5 + Math.random() * (max - min + 1)
  randInt = Math.round(randInt);
  return randInt;
};

// создание массива объектов.
function  photos(num) {
  for(i = 1; i<=num; i++){
    arr.push(obj ={
      url: 'photos/' +i+ '.jpg',
      likes: randomInteger(15, 200),
      comments: randonElement(comments)
    })
  }
  return obj;
}
photos(25);

// отрисовка фото, лайков, комментариев. через фрагмент.
function renderPictures (advert) {
var picturesElement = picturesTemplate.cloneNode(true);
  picturesElement.querySelector('.picture > img').src = advert.url;
  picturesElement.querySelector('.picture-likes').textContent = advert.likes;
  picturesElement.querySelector('.picture-comments').textContent = advert.comments;
  return picturesElement;
};

// galleryOverlay.classList.remove('hidden');

// отрисовка owerlay галереи.
function renderGaleryOverlay(advert) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = advert.url;
  galleryOverlay.querySelector('.gallery-overlay-image').alt = advert.url;
  galleryOverlay.querySelector('.likes-count').textContent = advert.likes;
  galleryOverlay.querySelector('.comments-count').textContent = advert.comments;
}

var fragment = document.createDocumentFragment();
for (i = 1; i < 25; i++){
  fragment.appendChild(renderPictures(arr[i]));
  renderGaleryOverlay(arr[i]);
}
pictures.appendChild(fragment);

// часть вторая
var ESC = 27;
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFile = document.querySelector('#upload-file');
var uploadFormCancel = document.querySelector('.upload-form-cancel');
// отображение редактора фото , после того как фото было загружено.
function uploadFileChangeHandler () {
  uploadOverlay.classList.remove('hidden');
}
uploadFile.addEventListener('change',uploadFileChangeHandler);

function escKeydownHandler(evt){
  if(evt.keyCode === ESC){
    uploadOverlay.classList.add('hidden');
  }
}
document.addEventListener('keydown',escKeydownHandler);

//закрытие редактора фото.
function uploadFormCancelClickHandler() {
  uploadOverlay.classList.add('hidden');
}
uploadFormCancel.addEventListener('click',uploadFormCancelClickHandler);









