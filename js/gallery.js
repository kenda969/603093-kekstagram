'use strict';
(function () {
	var pictures = document.querySelector('.pictures ');
	
	function errorMessage(error) {
		message.message(error);
	}
	
	var fragment = document.createDocumentFragment();

	function loadData(photoGallery) {
		photoGallery.forEach(function (arr) {
			fragment.appendChild(window.renderPictures(arr));
		});
    pictures.appendChild(fragment);
    filter.initFilters(photoGallery);
  }
	
	window.gallery = {errorMessage: errorMessage};
	
	backend.load(loadData,errorMessage);
	
})();
