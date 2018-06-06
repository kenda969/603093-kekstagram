'use strict';
(function () {
	// часть первая
	var i;
	var obj;
	var arr = [];
	var pictures = document.querySelector('.pictures ');

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
		for(i = 1; i<= num; i++){
			arr.push(obj ={
				url: 'photos/' +i+ '.jpg',
				likes: randomInteger(15, 200),
				comments: randonElement(data.comments)
			})
		}
		return obj;
	}
	photos(25);
	
	var fragment = document.createDocumentFragment();
	for (i = 1; i < 25; i++){
		fragment.appendChild(window.renderPictures(arr[i]));
		window.renderGaleryOverlay(arr[i]);
	}
	pictures.appendChild(fragment);

})();

