(function () {
  var filters = document.querySelector('.filters');

  var filterCallback = function () {
    var errorMes = 'you must registre callback by onFilterChange';
    return errorMes;
  };

  // Отображение фильтров после загрузки данных с сервера.
  function filterInit(photoGallery) {
    filterData(photoGallery);
    filterCallback = photoGallery;
    filterPopular(photoGallery);
    filters.classList.remove('filters-inactive');
  }
  function filterData(photoGallery) {
    
    var imageComments = photoGallery.map(function (comment){
      return comment.comments;
    });
    
    
  }
  // Фильтр (ПОПУЛЯРНЫЕ) функция возвращает новый массив отсортированный по лайкам(порода собаки ;))) ).
  function filterPopular(photoGallery) {
    var popularPhoto = [];
    var obj;
	  var imageLikes = photoGallery.map(function (likes) {
		  return likes.likes;
	  });

		  // Сортировка расчесткой.
	    var interval = Math.floor(imageLikes.length / 1.3);
	
	    while (interval > 0) {
		    for(var i = 0; i + interval < imageLikes.length; i += 1) {
			    if (imageLikes[i] < imageLikes[i + interval]) {
				    var small = imageLikes[i + interval];
				    imageLikes[i + interval] = imageLikes[i];
				    imageLikes[i] = small;
			    }
		    }
		    interval = Math.floor(interval / 1.3);
	    }

      // созлание нового массива.
	    for(i = 0; i < photoGallery.length; i++){
	      for(var j = 0; j < photoGallery.length; j++){
          if(imageLikes[0] === photoGallery[j].likes){
            popularPhoto.push(obj = {
              url: photoGallery[j].url,
              likes: photoGallery[j].likes,
              comments: photoGallery[j].comments
            });
            imageLikes.shift(i);
          }
        }
      }
      return popularPhoto;
  }

  window.filter = {
    initFilters: filterInit
  };
})();
