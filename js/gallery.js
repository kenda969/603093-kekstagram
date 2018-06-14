(function () {
	// часть первая
	var pictures = document.querySelector('.pictures ');
function errorMessage() {
	alert('qwe');
}

window.backend.load(loadData,errorMessage);

	var fragment = document.createDocumentFragment();
	function loadData(advert) {
    for (var i = 1; i < advert.length; i++){
      fragment.appendChild(window.renderPictures(advert[i]));
    }
    pictures.appendChild(fragment);
  }
})();

