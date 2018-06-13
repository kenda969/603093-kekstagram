(function () {
function dataRequest ( errorHandler) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = 20000;

  function xhrLoadHandler () {
    var error;
    switch (xhr.status){
      case 200:
        xhr.response;
        break;
      case 400:
        error = 'неверный запрос';
        break;
      case 404:
        error = 'Упс!!! ничего нет';
        break;
      default:
        error = 'Статус ответа: :' + xhr.status + ' ' + xhr.statusText;
    }
    if(error){
      errorHandler(error);
    }
  }
  xhr.addEventListener('load', xhrLoadHandler);
  xhr.addEventListener('error', function () {
    errorHandler('Ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    errorHandler('Превышение ожидания запроса' + xhr.timeout + 'мс');
  });
  return xhr;
}
  function load( errorHandler) {
  var xhr  = dataRequest( errorHandler);
  xhr.open('GET',data.URL + '/data');
  xhr.send();
  }
  window.backend = {
  load: load
  };

})();
