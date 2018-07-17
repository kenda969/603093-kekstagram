(function () {
  var filters = document.querySelector('.filters');



  var filterCallback = function () {
    var errorMess = 'you must registre callback by onFilterChange';
    return errorMess;
  };

  // Отображение фильтров после загрузки данных с сервера.
  function filterInit(photoGallery) {
    filterCallback = photoGallery;
    filterPopular(photoGallery);
    filterDiscussed(photoGallery);
    filterRandom(photoGallery);
    filters.classList.remove('filters-inactive');
  }
  // Копия данных с сервера
  function getCopyphotoGallery(photoGallery) {
    var newPhotoGallery = photoGallery.slice(0);
    return newPhotoGallery;
  }

  // Фильтр ПОПУЛЯРНЫЕ.
  function filterPopular(photoGallery) {
    var photoPopular = getCopyphotoGallery(photoGallery).sort(function (a,b) {
      return a.likes - b.likes;
    });
    photoPopular.reverse();
  }

  // Фильтр ОБСУЖДАЕМЫЕ.
  function filterDiscussed(photoGallery) {
    var photoDiscussed = getCopyphotoGallery(photoGallery).sort(function (a,b) {
      return a.comments.length - b.comments.length;
    });
    photoDiscussed.reverse();
  }

  //Фильтр СЛУЧАЙНЫЕ.
  function filterRandom(photoGallery) {
    var copyPhoto = getCopyphotoGallery(photoGallery);
    var photoRandom = [];
    var photoRand;
    for(var i = 0; i < photoGallery.length; i++){
	     photoRand = Math.floor(Math.random() * copyPhoto.length);
	     photoRandom.push(copyPhoto[photoRand]);
       copyPhoto.splice(photoRand,1);
    }
    return photoRandom;
  }

  function filtersMouseupHahdler(evt, photoGallery) {
    var value = evt.target.control.defaultValue;
    getFiltersArr(value, photoGallery);
  }

  function getFiltersArr(vle, photoGallery) {
    var filtersArr;
    switch(vle){
      case 'recommend':
        filtersArr = photoGallery;
        break;
      case 'popular':
        filtersArr = filterPopular(photoGallery);
        break;
      case  'discussed':
        filtersArr = filterDiscussed(photoGallery);
        break;
      case  'random':
        filtersArr = filterRandom(photoGallery);
        break;
    }
    return filtersArr;
  }
  filters.addEventListener('mouseup', filtersMouseupHahdler);

  window.filter = {initFilters: filterInit};
})();
