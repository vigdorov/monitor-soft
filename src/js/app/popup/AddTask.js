const FormGroup = require('./FormGroup');

// Функция в цикле создает столько полей для формы редактирования\добавления
// записей, сколько существует в базе данных (если количество столбцов
// измениться, то форма будет работать корректно
let AddTask = function () {

  let div = createDOMElement('div', false, 'form-group');


  this.forms = [];

  for (let key in state.date[0]) {
    let form = new FormGroup({
      parent: div,
      type: 'text',
      label: key,
      hint: 'Введите ' + key,
      id: 'm-' + key,
      imp: true,
    });
    form.key = key;

    this.forms.push(form);
  }

  this.getForm = function () {
    return div;
  };

  this.setForm = function (index) {
    if (index !== undefined) {
      this.forms.forEach( function (form) {
        form.inputValue(state.date[index][form.key]);
      })
    }
  };

  this.clearForm = function () {
    this.forms.forEach( function (form) {
      form.clearValue();
    });
  };
};

module.exports = AddTask;