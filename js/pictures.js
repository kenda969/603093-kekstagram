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
}

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

//закрытие редактора фото.
function escKeydownHandler(evt){
  if(evt.keyCode === ESC){
    uploadOverlay.classList.add('hidden');
  }
}
document.addEventListener('keydown',escKeydownHandler);

function uploadFormCancelClickHandler() {
  uploadOverlay.classList.add('hidden');
}
uploadFormCancel.addEventListener('click',uploadFormCancelClickHandler);

//Редактирование размера фотографии.
var sizeDefault = 55;
var uploadResizeControls = document.querySelector('.upload-resize-controls')
 var uploadResizeControlsButtonDec = 'upload-resize-control upload-resize-controls-button upload-resize-controls-button-dec';
 var uploadResizeControlsButtonInc = 'upload-resize-control upload-resize-controls-button upload-resize-controls-button-inc';
 var uploadResizeControlsValue = uploadResizeControls.querySelector('.upload-resize-controls-value');
 var uploadFormPreviewContainer = document.querySelector('.upload-form-preview');
 
 uploadFormPreviewContainer.style.width = '586px';
 uploadFormPreviewContainer.style.height = '586px';
 uploadFormPreviewContainer.style.overflow = 'hidden';

 uploadFormPreviewContainer.style.border = '1px solid #715F10';

 function resizeImage (sizeToProcent) {
	 uploadFormPreview.style.width = 45 +  sizeToProcent + '%';
	 uploadFormPreview.style.height = 45 +  sizeToProcent + '%';
 }
 

function uploadResizeControlsClickHandler(evt) {
	 var className = evt.target.className;
	 
	 if(className === uploadResizeControlsButtonInc){
	   sizeDefault !== 100 ? sizeDefault +=5:sizeDefault = 100;
     uploadResizeControlsValue.value = sizeDefault + '%';
   }else if (className === uploadResizeControlsButtonDec){
		 sizeDefault === 0 ? sizeDefault = 0:sizeDefault -= 5;
		 uploadResizeControlsValue.value = sizeDefault + '%';
   }
   resizeImage(sizeDefault);
 }
 uploadResizeControls.addEventListener('click',  uploadResizeControlsClickHandler);


// Применение эффекта для избражений
var WIDTH_LINE = 495;
var uploadEffectLevel = document.querySelector('.upload-effect-level');
var uploadEffectLevelPin = uploadEffectLevel.querySelector('.upload-effect-level-pin');
var uploadFormPreview = document.querySelector('.upload-form-preview > img');
var uploadEffectLevelVal = uploadEffectLevel.querySelector('.upload-effect-level-val');
var uploadEffectControls = document.querySelector('.upload-effect-controls');

uploadEffectLevelPin.style.left = '0';
uploadEffectLevelVal.style.width = '0';

  function uploadEffectControlsClickHandler(evt) {
  var uploadEffectControlsValue = evt.target.value;
  var className = 'effect-' + uploadEffectControlsValue;
  if(uploadEffectControlsValue){
    uploadFormPreview.className = className;
    uploadFormPreview.style.removeProperty('filter');
    uploadEffectLevelPin.style.left = scrollDefaultPin(className);
    uploadEffectLevelVal.style.width = scrollDefaultPin(className);
      }
  return;
}
uploadEffectControls.addEventListener('click',uploadEffectControlsClickHandler);

function scrollDefaultPin(className) {
    var posicionPin;
    switch (className){
      case 'effect-none':
        posicionPin = '0';
        break;
      case 'effect-phobos':
        posicionPin = '50%';
        break;
      default:
        posicionPin = '100%';
        break;
    }
    return posicionPin;
  }

function effectImageFilter (className) {
  var imageFilter;

  switch (className){
    case 'effect-chrome':
      imageFilter = 'grayscale';
      break;
    case 'effect-sepia':
      imageFilter = 'sepia';
      break;
    case 'effect-marvin':
      imageFilter = 'invert';
      break;
    case 'effect-phobos':
      imageFilter = 'blur';
      break;
    case 'effect-heat':
      imageFilter = 'brightness';
      break;
    case 'effect-none':
      imageFilter = 'none';
      break;
  }
  return imageFilter;
}

function effectImageFilterSaturate(effectFilter, numFilter) {
  var saturate;
  var x;

  switch (effectFilter){
    case 'grayscale':
      x = numFilter / 100;
      saturate = x.toPrecision(1);
      break;
    case 'sepia':
      x = numFilter / 100;
      saturate = x.toPrecision(1);
      break;
    case 'invert':
      saturate = numFilter + '%';
      break;
    case 'blur':
      saturate = numFilter / 10 + 'px';
      break;
    case 'brightness':
      saturate = numFilter * 3 + '%';
      break;
    case 'none':
      saturate = '';
      break;
  }
  return saturate;
}

function percentageNum(percentageX,percentageFull) {
var percentage = (percentageX / percentageFull) * 100;
return percentage;
}

// Перетаскивание пина

function uploadEffectLevelPinMousedovn(evt) {
	evt.preventDefault();
	
	var beginCoords = {
		x: evt.clientX,
		y: evt.clientY
	};
	var dragged = false;
	
	function uploadEffectLevelPinMousemove(moveEvt) {
		moveEvt.preventDefault();
		dragged = true;
		var shift = {
			x: beginCoords.x - moveEvt.clientX,
			y: beginCoords.y - moveEvt.clientY
		};
  
		beginCoords = {
			x: moveEvt.clientX,
			y: moveEvt.clientY
		};
  
    uploadEffectLevelPin.style.left = 	uploadEffectLevelPin.offsetLeft - shift.x +'px';
		uploadEffectLevelVal.style.width = 	uploadEffectLevelPin.offsetLeft - shift.x +'px';
		// uploadEffectLevelPin.style.top = uploadEffectLevelPin.offsetTop - shift.y +'px';
	
	}
	function uploadEffectLevelPinMouseupHandler(upEvt) {
		upEvt.preventDefault();

		// var numFilter = percentageNum(offsetX,WIDTH_LINE);
		// var className = uploadFormPreview.className;
  
		
		// uploadFormPreview.style.filter = effectImageFilter(className) +
		// '('+ effectImageFilterSaturate(effectImageFilter(className), Math.floor(numFilter)) +')';
		
		document.removeEventListener('mousemove',uploadEffectLevelPinMousemove);
		document.removeEventListener('mouseup', uploadEffectLevelPinMouseupHandler);
	}
	document.addEventListener('mousemove',uploadEffectLevelPinMousemove);
	document.addEventListener('mouseup', uploadEffectLevelPinMouseupHandler);
}
uploadEffectLevelPin.addEventListener('mousedown', uploadEffectLevelPinMousedovn );





// Валидация формы.
var uploadSubmit = document.querySelector('#upload-submit');
var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var uploadFormDescription = document.querySelector('.upload-form-description');

// Проверка длинны массива. Не более 5 хэштэгов.
function checkLengthArray(arr) {
	if(arr.length > 5){
		uploadFormHashtags.setCustomValidity('Должно быть не больше 5 хэштегов!!!');
		uploadFormHashtags.style.borderColor = 'red';
	} else {
		uploadFormHashtags.style.borderColor = '';
  }
}

// Проверка длинны  элементов массива. Не более 20 символов..
function checkLengthArrayElement(arr) {
	for (i = 0; i < arr.length; i++) {
		if (arr[i].length > 20) {
			alert('Этот хэш тег ( ' + arr[i] + ') слишком длинный !!!');
		}
	}
}

// Проверка элементов массива на идентичные записи не регистрозависимые..
function checkMatchingArrayElement(arr) {
  var hashtagsCoincidence = [];
	arr.forEach(function(val, index){
	  var hashtags = val.toLowerCase();
		if(index !== arr.lastIndexOf(hashtags) && hashtagsCoincidence.indexOf(hashtags) === -1)
			hashtagsCoincidence.push(hashtags);
	});
	if(hashtagsCoincidence.length !== 0){
		alert('Имеются одинаковые хэштеги!!!');
  }
};

// Обработка Хэштэгов на валидность в поле хэштэг
function uploadFormHashtagsChangeHandler() {
  var uploadFormHashtagsValue = this.value.split(' ');
  checkLengthArray(uploadFormHashtagsValue);
  checkLengthArrayElement(uploadFormHashtagsValue);
  checkMatchingArrayElement(uploadFormHashtagsValue);
}
uploadFormHashtags.addEventListener('change', uploadFormHashtagsChangeHandler);

// Обработка коментария на валидность.
 function uploadFormDescriptionChangeHandler (){
   var uploadFormDescriptionValue = this.value;
   if (uploadFormDescriptionValue.length > 140){
     // alert('Ваш комментарий слишком большой!!!');
     uploadFormDescription.style.borderColor = 'red';
   }else {
     uploadFormDescription.style.borderColor = '';
   }
 }
uploadFormDescription.addEventListener('change',uploadFormDescriptionChangeHandler);

 // Отмена события по нажатию на кнопку ESC при фокусе в поле комментарий.
uploadFormDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown',escKeydownHandler);
});

// Возврат события по нажатию на кнопку ESC при потере фокуса поля комментария.
uploadFormDescription.addEventListener('blur', function () {
  document.addEventListener('keydown',escKeydownHandler);
});

// Отправка данных на сервер.
function  uploadSubmitClickHandler() {
  uploadSubmit.preventDefault();
	uploadFormHashtags.addEventListener('change', uploadFormHashtagsChangeHandler);
}
uploadSubmit.addEventListener('click', uploadSubmitClickHandler);


