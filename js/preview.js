(function () {
	var galleryOverlay = document.querySelector('.gallery-overlay');
	var container = document.querySelector('.container');
   galleryOverlay.classList.remove('hidden');
   galleryOverlay.style.display ='none';
   var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

   // Выводит Overlay  на страницу
	function renderGaleryOverlay (advert) {
		galleryOverlay.querySelector('.gallery-overlay-image').src = advert.url;
		galleryOverlay.querySelector('.gallery-overlay-image').alt = advert.url;
		galleryOverlay.querySelector('.likes-count').textContent = advert.likes;
		galleryOverlay.querySelector('.comments-count').textContent = advert.comments;
	}
	
	// Формирует данные для Overlay
  function renderOverlay(evt) {
		evt.preventDefault();
		var target = evt.target;
		var ovr = {
				url: target.src,
				comments: target.parentNode.children['1'].children['0'].innerText,
				likes: target.parentNode.children['1'].children['1'].innerText
		}
	if(target.tagName === 'IMG'){
		renderGaleryOverlay(ovr);
    galleryOverlay.style.display ='block';
    galleryOverlayClose.addEventListener('click', function () {
    galleryOverlay.style.display ='none';
  });
}
return;
  }
  container.addEventListener('click', renderOverlay);
})();
