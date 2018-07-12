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
      copyPhoto.splice(copyPhoto[photoRand]);


    }
    console.log(photoRandom);
    return photoRandom;

  }

  window.filter = {
    initFilters: filterInit
  };
})();
