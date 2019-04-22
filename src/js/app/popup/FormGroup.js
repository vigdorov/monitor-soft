/*
  Конструктор принимает объект с настройками:

    parent - объект, в который добавить форму
    label  - текст label'а формы
    type   - тип поля
    hint   - подсказка формы
    id     - идентификатор формы
    imp    - если true, то добавляет красную звездочку к label'у


  Конструктор возвращает объет управления формой с методами:

    inputValue - геттер\сеттер принимает значения в качестве параметра
                 и выводит его в input, возвращает значение из input'a,
                 если вызвать без параметров

    errorMsg   - принимает сообщение об ошибке, которое нужно вывести
                 под формой, возвращает исходное состояние формы,
                 если запустить ез параметров

    events     - принимает объект с событиями, которые нужно повесить
                 на input. Ожидается следующий объект, с любыми событиями:
                 {
                   input: function() {
                     // ваш код
                   },
                   click: function () {
                     // ваш код
                   },
                 }
  */

let FormGroup = function (settings) {


  let div = createDOMElement({
    tagName: 'div',
    parent: settings.parent,
    property: {
      className: 'form-group',
    },
  });

  let label = createDOMElement({
    tagName: 'label',
    parent: div,
    property: {
      textContent: settings.label,
    },
    attributes: {
      for: settings.id,
    },
  });

  if (settings.imp) {
    createDOMElement({
      tagName: 'span',
      parent: label,
      property: {
        className: 'text-danger',
        textContent: ' *',
      },
    });
  }

  let input = createDOMElement({
    tagName: 'input',
    parent: div,
    property: {
      className: 'form-control',
    },
    attributes: {
      type: settings.type,
      placeholder: settings.hint,
      id: settings.id,
    },
  });

  let small = createDOMElement({
    tagName: 'small',
    parent: div,
    property: {
      className: 'text-danger',
    },
  });

  this.inputValue = function (value) {
    if (value === undefined) {
      return input.value;
    } else {
      input.value = value;
    }
  };

  this.clearValue = function () {
    input.value = '';
    this.errorMsg();
  };

  this.errorMsg = function (msg) {
    if (msg) {
      label.classList.add('text-danger');
      input.classList.add('is-invalid');
    } else {
      label.classList.remove('text-danger');
      input.classList.remove('is-invalid');
    }
    small.textContent = msg || '';
  };

  this.events = function (events) {
    for (let event in events) {
      input.addEventListener(event, events[event]);
    }
  };

};

module.exports = FormGroup;