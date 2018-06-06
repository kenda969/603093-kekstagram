(function () {
	var galleryOverlay = document.querySelector('.gallery-overlay');
	// galleryOverlay.classList.remove('hidden');
	
	window.renderGaleryOverlay =  function(advert) {
		galleryOverlay.querySelector('.gallery-overlay-image').src = advert.url;
		galleryOverlay.querySelector('.gallery-overlay-image').alt = advert.url;
		galleryOverlay.querySelector('.likes-count').textContent = advert.likes;
		galleryOverlay.querySelector('.comments-count').textContent = advert.comments;
	}
	
})();
