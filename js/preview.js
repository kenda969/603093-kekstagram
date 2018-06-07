(function () {
	var galleryOverlay = document.querySelector('.gallery-overlay');
	var pictureImg = document.querySelector('.picture');
	var container = document.querySelector('.container');
   galleryOverlay.classList.remove('hidden');
   galleryOverlay.style.display ='none';


	
	window.renderGaleryOverlay =  function(advert) {
		galleryOverlay.querySelector('.gallery-overlay-image').src = advert.url;
		galleryOverlay.querySelector('.gallery-overlay-image').alt = advert.url;
		galleryOverlay.querySelector('.likes-count').textContent = advert.likes;
		galleryOverlay.querySelector('.comments-count').textContent = advert.comments;
	}
	
	
  function qwe(evt) {
		evt.preventDefault();
		var target = evt.target;
var ad = {
	url: target.src,
	comments: target.parentNode.children['1'].children['0'].innerText,
	likes: target.parentNode.children['1'].children['1'].innerText
}
if(target.tagName === 'IMG'){
	window.renderGaleryOverlay(ad);
  galleryOverlay.style.display ='block';
}else {
return;
}
  }
  container.addEventListener('click', qwe);
  // footer-logo-image
})();
