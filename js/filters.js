(function () {
  var filters = document.querySelector('.filters');

  var filterCallback = function () {
    var errorMess = 'you must registre callback by onFilterChange';
    return errorMess;
  };

  // Отображение фильтров после загрузки данных с сервера.
  function filterInit(photoGallery) {
    filterComments(photoGallery);
    filterCallback = photoGallery;
    filterPopular(photoGallery);
    filters.classList.remove('filters-inactive');
  }
  function filterComments(photoGallery) {
    
    var imageComments = photoGallery.map(function (comment){
      return comment.comments;
    });
    var q;
    for(var i = 0; i < imageComments.length; i++){

       q = imageComments[i];
       console.log(q);

    }




    // sortingUseComb(imageCommentsItem);


    
  }
  // Фильтр (ПОПУЛЯРНЫЕ) функция возвращает новый массив отсортированный по лайкам(порода собаки ;))) ).
  function filterPopular(photoGallery) {
    var popularPhoto = [];
    var obj;
	  var imageLikes = photoGallery.map(function (likes) {
		  return likes.likes;
	  });

	  sortingUseComb(imageLikes);

      // создание нового массива.
	    for(var i = 0; i < photoGallery.length; i++){
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
  // Сортировка расчесткой.
  function sortingUseComb(arr) {

      var interval = Math.floor(arr.length / 1.3);

      while (interval > 0) {
        for(var i = 0; i + interval < arr.length; i += 1) {
          if (arr[i] < arr[i + interval]) {
            var small = arr[i + interval];
            arr[i + interval] = arr[i];
            arr[i] = small;
          }
        }
        interval = Math.floor(interval / 1.3);


    }
  }

  window.filter = {
    initFilters: filterInit
  };
})();
