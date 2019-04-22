let GeneralControls = function () {

  // Функция сбрасывает значение кнопок на нижней панели к исходному значению
  this.refreshAppButtons = function () {
    app.buttonAddEditTask.textContent = 'Добавить запись';
    app.buttonAddEditTask.classList.remove('btn-warning');

    if (state.editIndex > -1) {
      let tr = document.getElementById('tr-' + state.editIndex);
      tr.classList.remove('table-warning');
    }

    app.buttonDeleteTask.classList.add('invisible');
    app.buttonCancelEditTask.classList.add('invisible');
    state.editIndex = -1;

    let buttonUpdate = document.getElementById('update-button');
    if (state.authorization) {
      app.buttonAddEditTask.classList.remove('invisible');
      app.authText.classList.add('d-none');
      buttonUpdate.classList.remove('d-none');
    } else {
      app.buttonAddEditTask.classList.add('invisible');
      app.authText.classList.remove('d-none');
      buttonUpdate.classList.add('d-none');
    }
  };

  // первоначальный запуск отрисовки таблицы
  app.table.render(app.parent);
  this.refreshAppButtons();


  // Обработчик кнопки, который запускает редактирование кнопки
  app.buttonAddEditTask.addEventListener('click', function () {
    if (state.editIndex > -1) {
      app.popupAddTask.setDate({
        header: 'Редактировать запись',
        activeButtonText: 'Сохранить',
      });
    }
    app.popupAddTask.render();
  });

  // Обработчик кнопки, который удаляет записи
  app.buttonDeleteTask.addEventListener('click', function () {
    app.message.createMsg({
      header: 'Запись удалена',
      text: 'Удалена строка №' + (state.editIndex + 1),
    });
    state.date.splice(state.editIndex, 1);
    state.editIndex = -1;
    app.setStorage();
    app.table.render(app.parent);
    app.controls.refreshAppButtons();
  });

  // Обработчик кнопки, который отменяет редактирование
  app.buttonCancelEditTask.addEventListener('click', () => {
    this.refreshAppButtons();
  });

  // Обработчик кнопки, который открывает окно авторизации
  app.buttonAuth.addEventListener('click', function () {
    app.popupLogin.render();
  });

  // Обработчик кнопки обновления базы данных
  let buttonUpdate = document.getElementById('update-button');
  buttonUpdate.addEventListener('click', () => {
    buttonUpdate.blur();
    app.getStorage(true);
    app.setStorage();
    app.table.render(app.parent);
    this.refreshAppButtons();
  });

};

module.exports = GeneralControls;