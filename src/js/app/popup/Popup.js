const Login = require('./Login');
const AddTask = require('./AddTask');

let Popup = function (type) {

  // Инициализируем данные для будущей формы
  let header = document.getElementById('m-header');
  let body   = document.getElementById('m-body');
  let footer = document.getElementById('m-footer');

  let date = {
    header: '',
    body:   '',
    activeButtonText: '',
    cancelButtonText: '',
    activeButtonFunction: '',
    cancelButtonFunction: '',
  };

  // функция установки параметров в виде объекта
  this.setDate = function (value) {
    if (value) {
      for (let key in value) {
        date[key] = value[key];
      }
    }
  };

  if (type === 'login') {
    date.header = 'Авторизация';
    date.body = new Login;
    date.activeButtonText = 'Войти';
    date.cancelButtonText = 'Отмена';
    date.activeButtonFunction = function () {

      let inputValue = date.body.login.inputValue();
      let passwordValue = date.body.password.inputValue();

      // Функция проверки полей ввода
      let checkForm = function () {
        let check = true;

        if (!inputValue) {
          date.body.login.errorMsg('Введите логин');
          date.body.login.events({
            click: function () {
              date.body.login.errorMsg();
            }
          });
          check = false;
        }

        if (!passwordValue) {
          date.body.password.errorMsg('Введите пароль');
          date.body.password.events({
            click: function () {
              date.body.password.errorMsg();
            }
          });
          check = false;
        }

        return check;
      };

      // Если проверка пройдена, то авторизуемся
      if (checkForm()) {
        let activeButton = document.getElementById('m-active-btn-' + type);
        activeButton.setAttribute('data-dismiss', 'modal');

        state.authorization = inputValue;

        let btnAuth = document.getElementById('btn-auth');
        let btnAuthName = document.getElementById('btn-auth-name');
        let btnAuthClose = document.getElementById('btn-auth-close');
        btnAuth.classList.add('d-none');
        btnAuthName.classList.remove('d-none');
        btnAuthName.children[0].textContent = state.authorization + ' ';

        app.controls.refreshAppButtons();

        btnAuthClose.addEventListener('click', function () {
          btnAuth.classList.remove('d-none');
          btnAuthName.classList.add('d-none');
          state.authorization = false;
          app.controls.refreshAppButtons();
        });
      }

    };
  }

  // Наполняем форму для добавления\редактирования записей
  if (type === 'add') {
    date.header = 'Добавить запись';
    date.body = new AddTask();
    date.activeButtonText = 'Добавить';
    date.cancelButtonText = 'Отмена';
    date.activeButtonFunction = function () {

      // Проверка полей ввода
      let checkForm = function () {
        let check = true;
        date.body.forms.forEach( function (element) {
          if (!element.inputValue()) {
            element.errorMsg('Заполните поле');
            element.events({
              click: function () {
                element.errorMsg();
              }
            });
            check = false;
          }
        });
        return check;
      };

      // Если проверка пройдена, то добавляем\редактируем запись
      if (checkForm()) {
        let activeButton = document.getElementById('m-active-btn-' + type);
        activeButton.setAttribute('data-dismiss', 'modal');

        let note = {};

        date.body.forms.forEach( function (element) {
          note[element.key] = element.inputValue();
        });

        if (state.editIndex > -1) {
          state.date[state.editIndex] = note;
          app.message.createMsg({
            header: 'Запись изменена',
            text: 'Отредактирована запись №' + state.editIndex,
          });
        } else {
          state.date.unshift(note);
          app.message.createMsg({
            header: 'Запись добавлена',
            text: 'Добавлена запись в начало таблицы',
          });
        }

        app.setStorage();
        app.table.render(app.parent);
      }
    };
  }

  // Функция, которая помещает инициализированную форму в модальное окно
  this.render = function () {
    header.textContent = date.header;

    body.innerHTML = '';
    body.appendChild( date.body.getForm() );
    date.body.clearForm();

    if (state.editIndex > -1) {
      date.body.setForm(state.editIndex);
    }

    footer.innerHTML = '';

    let cancelButton = createDOMElement({
      tagName: 'button',
      parent: footer,
      property: {
        className: 'btn btn-secondary',
        textContent: date.cancelButtonText,
      },
      attributes: {
        type: 'button',
        'data-dismiss': 'modal',
      },
    });

    let activeButton = createDOMElement({
      tagName: 'button',
      parent: footer,
      property: {
        className: 'btn btn-primary',
        textContent: date.activeButtonText,
      },
      attributes: {
        type: 'button',
        id: 'm-active-btn-' + type,
      },
    });

    if (date.activeButtonFunction) {
      activeButton.addEventListener('click', date.activeButtonFunction);
    }

    if (date.cancelButtonFunction) {
      cancelButton.addEventListener('click', date.cancelButtonFunction);
    }

  }
};

module.exports = Popup;