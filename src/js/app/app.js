require('../modules/createDOMElement');

const Notification = require('./notification/Notification');
const GeneralControls = require('./controls/general');
const request = require('./requestManager/RequestManager');
const Table = require('./table/Table');
const Popup = require('./popup/Popup');

let App = function () {

  // Создаем объект хранения основных данных
  window.state = {
    date: {},             // Загруженная база данных
    editIndex: -1,         // Индекс редактируемого элемента
    authorization: false, // Статус авторизации
  };

  // Прикрепляем объект к window, чтобы обращаться к его интерфейсу
  window.app = this;

  // Подключаем систему уведомлений
  this.message = new Notification();

  // Функция загрузки данных с сервера или из LocalStorage
  this.getStorage = function(onServer) {
    if (onServer) {
      request.getDate();
    } else {
      let localDate = localStorage.getItem('table');
      if (localDate) {
        state.date = JSON.parse(localDate);
      } else {
        request.getDate();
      }
    }
  };

  // Сразу заппрашиваем данные с сервера или из LocalStorage
  this.getStorage();

  // Функция записи данных из state.date в LocalStorage
  this.setStorage = function() {
    let table = JSON.stringify(state.date);
    localStorage.setItem('table', table);
  };

  // Обновляем сразу LocalStorage
  this.setStorage();

  // Сохраняем кнопки для быстрого доступа к ним
  this.authText = document.getElementById('auth-text');
  this.buttonAddEditTask = document.getElementById('add-task');
  this.buttonDeleteTask = document.getElementById('delete-task');
  this.buttonCancelEditTask = document.getElementById('cancel-edit-task');
  this.buttonAuth = document.getElementById('btn-auth');

  // Сохраняем родительский див в котором будет размещено приложение
  this.parent = document.getElementById('app');

  // Создаем объект рисования и обновления таблицы
  this.table = new Table();

  // Создаем объект управления приложением
  this.controls = new GeneralControls(this);

  // Создаем всплывающие окна для авторизации и добавления\редатирования

  this.popupAddTask = new Popup('add');
  this.popupEditTask = new Popup('edit');
  this.popupLogin = new Popup('login');

};

module.exports = App;


/*

- сделать чтобы данные загружались с сервера только если LS пустой, иначе пусть редактируется локальное хранилище. Добавить кнопку по которой можно обновить данные из интернета. Пока идет загрузка из интернета добавить лоадер, но так чтобы было доступно действие авторизации и программа не зависала.
- пагинация (настройка пагинации)
- (готово) авторизация
- (готово) добавление записей
- (готово) удаление записей
- (готово) закрыть любые действия без авторизации
- система оповещений

*/
