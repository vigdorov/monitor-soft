const FormGroup = require('./FormGroup');

let Login = function () {

  let div = createDOMElement('div', false, 'form-group');

  this.login = new FormGroup({
    parent: div,
    type: 'text',
    label: 'Логин:',
    hint: 'Введите логин',
    id: 'm-login',
    imp: true,
  });

  this.password = new FormGroup({
    parent: div,
    type: 'password',
    label: 'Пароль:',
    hint: 'Введите пароль',
    id: 'm-password',
    imp: true,
  });

  this.getForm = function () {
    return div;
  };

  this.clearForm = function () {
    this.login.clearValue();
    this.password.clearValue();
  };
};

module.exports = Login;