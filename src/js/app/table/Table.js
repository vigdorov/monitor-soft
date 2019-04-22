let Header = require ('./Header');
let Body   = require ('./Body');

let Table = function () {

  /*
  В цикле создает две одинаковые таблицы. Одна фиксированная и прикрепленная
  к верху экрана, но с прозрачным содержимым. Вторая - лежит под ней.
  Благодаря этому создается эффект привязанного заголовка, а при
  редактировании таблицы пропорции столбцов сохраняются.

  При создании, таблица берет данные из глобального объекта state.date.
  В качестве заголовков таблицы будут использованы ключи объектов.
  Это позволяет выводить любые однотипные данные в таблице.

  Конструтор принимает объект, в который добавить таблицу.

  Конструктор возвращает объект управления таблицей с методами:

  */

  this.render = function (parent) {
    parent.innerHTML = '';

    for (let i = 0; i <= 1; i++) {

      let div = i ? createDOMElement('div', parent) : parent;

      if (i) {
        div.classList.add('fixed-top');
      }

      let table = createDOMElement({
        tagName: 'table',
        parent: div,
        property: {
          className: 'table table-responsive-mds',
        },
      });

      let header = new Header(table);
      let body   = new Body(table, i);

    }

  };

};

module.exports = Table;