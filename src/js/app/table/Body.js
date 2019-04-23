let Body = function (table, fixed) {

  let tbody = createDOMElement('tbody', table);

  if (fixed) {
    tbody.classList.add('body-invisible');
  }

  let startIndex = state.currentPage * state.countStringOnPage;
  let endIndex = Math.min(startIndex + state.countStringOnPage,
                          state.date.length);

  for (let i = startIndex; i < endIndex; i++) {
    let tr = createDOMElement({
      tagName: 'tr',
      parent: tbody,
      attributes: {
        id: 'tr-' + i,
      }
    });

    // Навешиваем на все строки таблицы обработчик для их редактирования
    tr.addEventListener('click', function () {
      if (state.authorization) {
        if (state.editIndex > -1) {
          let previousTr = document.getElementById('tr-' + state.editIndex);
          previousTr.classList.remove('table-warning');
        }
        state.editIndex = i;
        tr.classList.add('table-warning');

        app.buttonAddEditTask.textContent = 'Редактировать';
        app.buttonAddEditTask.classList.add('btn-warning');

        app.buttonDeleteTask.classList.remove('invisible');
        app.buttonCancelEditTask.classList.remove('invisible');
      } else {
        app.message.createMsg({
          header: 'Ошибка доступа',
          text: 'Для работы с таблицей - авторизуйтесь',
          color: 'danger',
        });
      }
    });

    let string = state.date[i];

    for (let key in string) {
      let td = createDOMElement({
        tagName: 'td',
        parent: tr,
        property: {
          textContent: string[key],
        },
      });

    }
  }

};

module.exports = Body;