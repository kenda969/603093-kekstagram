(function () {
  var filters = document.querySelector('.filters');

  var filterCallback = function () {
    var errorMes = 'you must registre callback by onFilterChange';
    return errorMes;
  };

  // Отображение фильтров после загрузки данных с сервера.
  function filterInit(advert) {
    filterCallback = advert;
    filters.classList.remove('filters-inactive');
  }

  window.filter = {
    initFilters: filterInit
  };
})();
