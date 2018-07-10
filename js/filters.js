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
    var discuss = [];
    var discussPhoto;
    var obj;
    var PhotoComments = photoGallery.map(function (comments) {
      return comments.comments;
    });
    for (var i = 0; i < PhotoComments.length; i++) {
      discuss.push(obj = {
        arr: PhotoComments[i].length
      });
    }
    var commentsCountItems = discuss.map(function (arr) {
     return arr.arr;
    });
    sortingUseComb(commentsCountItems);
    discussPhoto = getNewPhotoGallery(photoGallery,commentsCountItems);
    console.log(discussPhoto);
    return discussPhoto;
  }
  // Фильтр (ПОПУЛЯРНЫЕ).
  function filterPopular(photoGallery) {
    var popularPhoto;
	  var photoLikes = photoGallery.map(function (likes) {
		  return likes.likes;
	  });

	  sortingUseComb(photoLikes);
	  popularPhoto =  getNewPhotoGallery(photoGallery,photoLikes);
	  console.log(popularPhoto);
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

  // создание нового массива.
  function getNewPhotoGallery(photoGallery, arr) {
    var obj;
    var newPhotoGallery = [];
    for(var i = 0; i < photoGallery.length; i++){
      for(var j = 0; j < photoGallery.length; j++){
        if(arr[0] === photoGallery[j].likes || arr[0] === photoGallery[j].comments.length){
          newPhotoGallery.push(obj = {
            url: photoGallery[j].url,
            likes: photoGallery[j].likes,
            comments: photoGallery[j].comments
          });
          arr.shift(i);
        }
      }
    }
      return newPhotoGallery;
  }

  window.filter = {
    initFilters: filterInit
  };
})();
