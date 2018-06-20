(function () {
	// часть первая
	var pictures = document.querySelector('.pictures ');
	
function errorMessage(error) {
	alert(error);
}
	
	var fragment = document.createDocumentFragment();
	function loadData(advert) {
    for (var i = 1; i < advert.length; i++){
      fragment.appendChild(window.renderPictures(advert[i]));
    }
    pictures.appendChild(fragment);
  }
	
	window.backend.load(loadData,errorMessage);
	
	window.gallery = {
		errorMessage: errorMessage
	}
	
})();

