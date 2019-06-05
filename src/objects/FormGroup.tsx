// Подключение React
import * as React from 'react';

export default class FormGroup extends React.Component<Props, State> {
  /**
   * Компонент группы состоящий из label, input и span (для вывода ошибок).
   * Умеет отправлять данные поля родителю, принимает функцию для проверки
   * корректности ввода. Состояние объекта input необходимо хранить в родителе.
   */
  constructor (props: Props) {
    super(props);

    this.state = {
      // Хранит сообщение об ошибке, если поле заполнено не корректно
      errorMsg: ''
    }
  }

  /**
   * Метод проверки поля на корректность и отправки данных поля родителю
   *
   * @param e - объект события
   */
  handleChange = (e: any) => {
    let isErrorMsg = this.props.checkInputFunction(e.target.value);
    this.setState({
      errorMsg: isErrorMsg
    });
    this.props.getInputValue(e);
  };

  /**
   * Метод отрисовки элементов
   *
   * @returns {any} - возвращает JSX модуль для рендера
   */
  render () {
    let valid = this.state.errorMsg ? ' is-invalid' : '';
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          type={this.props.type}
          className={'form-control' + valid}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.handleChange}
        />
        <small className="form-text text-danger">
          {this.state.errorMsg}
        </small>
      </div>
    );
  }
}

// Интерфейс пропсов (props)
interface Props {
  id: string,
  label: string,
  type: string,
  placeholder: string,
  value: string,
  checkInputFunction: (inputValue: string) => string,
  getInputValue: (event: any) => void
}

// Интерфейс объекта state
interface State {
  errorMsg: string,
}