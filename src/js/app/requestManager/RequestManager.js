let RequestManager = function() {

  this.getDate = function () {

    // Функция запроса данных с сервера
    // Записываем время начала, чтобы потом выбросить срок загрузки
    let startTime = new Date();
    let data;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:2323/', false);
    xhr.send();
    data = JSON.parse(xhr.responseText);

    // Считает сколько секунд прошло с запуска
    let difference = (new Date() - startTime) / 1000;
    app.message.createMsg({
      header: 'Данные загружены',
      text: 'Время загрузки: ' + difference + ' сек',
    });

    // Сохраняем полученные данные
    state.date = data;
  };

};

module.exports = new RequestManager();