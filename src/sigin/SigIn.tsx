// Подключаем React
import * as React from 'react';

// Подключаем компоненты bootstrap на React
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

// Подключение модуля формы ввода
import FormGroup from '../objects/FormGroup';

export default class SigIn extends React.Component<Props, State> {
  /**
   * Страницв (компонент) авторизации\регистрации на сайте, он же
   * личный кабинет
   */
  formCheck: {
    [name: string]: boolean
  };

  constructor (props: Props) {
    super(props);
    this.state = {
      // Статус формы login или register
      formStatus: 'login',
      // Данные которые введены в поля ввода
      form: {
        email: '',
        password: '',
        retryPassword: ''
      },
      // Сообщение об ошибке полученное с сервера, после отправки формы
      errorMsg: '',
      // Разрешено ли отправлять форму
      successSend: false
    };

    // Объект содержит информацию - корректно ли заполнены поля ввода
    this.formCheck = {
      email: false,
      password: false,
      retryPassword: false
    }
  }

  /**
   * Метод изменения статуса формы логин\регистрация
   *
   * @param e - объект события
   */
  handleChangeStatusRegistry = (e: any) => {
    e.preventDefault();
    let status: 'register' | 'login' = 'register';
    if (e.target.name === 'cancel') {
      status = 'login';
    }
    this.setState({
      formStatus: status,
      form: {
        email: '',
        password: '',
        retryPassword: ''
      },
      successSend: false
    });
    this.formCheck = {
      email: false,
      password: false,
      retryPassword: status === 'login'
    }
  };

  /**
   * Метод получения значений из форм ввода
   *
   * @param e - объект события
   */
  handleGetInput = (e: any) => {
    let id: string = e.target.id,
        value = e.target.value;

    this.setState(prevState => {
      return {
        form: {
          ...prevState.form,
          [id]: value
        }
      };
    });
  };

  /**
   * Метод проверяет, правильно ли заполнены поляя ввода
   * и можно ли отправлять данные на сервер
   */
  handleCheckForm = () => {
    let check = true,
        form  = this.formCheck;

    if (!form.email) {
      check = false;
    }
    if (!form.password) {
      check = false;
    }
    if (!form.retryPassword && this.state.formStatus === 'register') {
      check = false;
    }

    if (this.props.auth.isAuthenticated()) {
      check = true;
    }

    if (check !== this.state.successSend) {
      this.setState({
        successSend: check
      });
    }
  };

  /**
   * Запускает проверку при монтаже компонента (страницы)
   */
  componentDidMount () {
    this.handleCheckForm();
  }

  /**
   * Метод меняет состояние корректности заполнения конкретного поля,
   * и запускает общую проверку можно ли отправлять данные формы
   * на сервер
   *
   * @param {string} name - имя формы
   * @param {boolean} variant - правильно ли заполнена
   */
  handleChangeCheckForm = (name: string, variant: boolean) => {
    this.formCheck[name] = variant;
    this.handleCheckForm();
  };

  /**
   * Метод проверки полей ввода для формы авторизации
   *
   * @param {string} inputValue - значение поля для проверки
   * @returns {string} - возвращает сообщение об ошибке, если условия
   *                     заполнения поля нарушены
   */
  handleCheckInput = (e: any, inputValue: string) => {
    if (!inputValue) {
      this.handleChangeCheckForm(e.target.id, false);
      return 'Заполните поле!'
    }
    if (e.target.id === 'retryPassword') {
      if (inputValue !== this.state.form.password) {
        this.handleChangeCheckForm(e.target.id, false);
        return 'Пароли не совпадают!'
      }
    }
    this.handleChangeCheckForm(e.target.id, true);
    return '';
  };

  /**
   * Метод обрабатывает нажание на кнопку Войти\Регистрация\Выйти
   */
  login = () => {
    // Колбек который будет выполнен после получения ответа от сервера
    let callback = (response: string) => {
      // если авторизация удалась
      if (response === this.state.form.email) {
        // меняем статус, что пользователь зашел в систему
        this.props.onAuth();
        this.props.onMsg('Добро пожаловать: ' + this.state.form.email);
      } else {
        // Если авторизация не удалась, то выводим сообщение сервера
        this.setState({
          errorMsg: response
        }, () => {
          let systemMsg = this.state.errorMsg,
              msg = '';
          if (systemMsg === 'Missing email or username') {
            msg = 'Сервер: E-mail не введен!';
          } else if (systemMsg === 'Missing password') {
            msg = 'Сервер: Пароль не введен!'
          } else if (systemMsg === 'user not found') {
            msg = 'Сервер: Пользователь не найден!'
          } else if (systemMsg === 'Note: Only defined users succeed registration') {
            msg = 'Сервер: Регистрация разрешена только подтвержденным пользователям!'
          } else {
            console.log(systemMsg);
            msg = systemMsg;
          }
          this.props.onMsg(msg);
          this.handleCheckForm();
        });
      }
    };

    // Подготавиваем данные для отправки запроса на сервер
    let data = {
      email: this.state.form.email,
      password: this.state.form.password
    };

    // Вызываем нужный запрос на сервер, в зависимости от того логин\регистрация
    if (this.state.formStatus === 'login') {
      this.props.auth.login(data, callback);
    } else {
      this.props.auth.register(data, callback);
    }
    // Блокируем нажатие кнопки на время обработки запроса сервером
    this.setState({
      successSend: false
    });
  };

  // Отрисовка формы логина\регистрации
  render () {
    // Сохраняем состояние в системе ли пользователь
    let isAuth = this.props.auth.isAuthenticated();

    // Заполняем форму данными
    // Если пользователь в системе
    let title = 'Личный кабинет',
        btn = 'Выйти';

    // Если пользователь не в системе
    if (!isAuth) {
      let status = this.state.formStatus;

      // Если текущее состояние логин
      if (status === 'login') {
        title = 'Авторизация';
        btn = 'Войти';
      } else {
        // Если текущее состояние регистрация
        title = 'Регистрация';
        btn = 'Регистрация';
      }
    }

    // Создаем объект формы логина
    let login = (
      <React.Fragment>

        {/* Форма ввода емайл */}
        <FormGroup
          id='email'
          type='text'
          label='E-mail:'
          placeholder='Введите e-mail'
          value={this.state.form.email}
          checkInputFunction={this.handleCheckInput}
          getInputValue={this.handleGetInput}
        />

        {/* Форма ввода пароля */}
        <FormGroup
          id='password'
          type='password'
          label='Пароль:'
          placeholder='Введите пароль'
          value={this.state.form.password}
          checkInputFunction={this.handleCheckInput}
          getInputValue={this.handleGetInput}/>
        {
          /* Если форма регистрация, то форма повторного ввода пароля */
          this.state.formStatus === 'register' &&
          <FormGroup
            id='retryPassword'
            type='password'
            label='Повторите пароль:'
            placeholder='Повторите пароль'
            value={this.state.form.retryPassword}
            checkInputFunction={this.handleCheckInput}
            getInputValue={this.handleGetInput}/>
        }
      </React.Fragment>
    );

    // Компонент приветствия пользователя в системе
    let welcome = (
      <React.Fragment>
        <p>Добро пожаловать {this.props.auth.email()}</p>
      </React.Fragment>
    );

    return (
      <Container>
        <Row className="justify-content-center">
          <Col lg={4} sm={6} xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Form>

                  {/* Если пользователь не авторизован то вывести login */}
                  {
                    !isAuth && login
                  }

                  {/* Если пользователь авторизован, то вывести приветсвие */}
                  {
                    isAuth && welcome
                  }
                  <Row className="justify-content-center">
                    <Col md={6} xs={8}>

                      {/* Кнопка входа, регистрации, вызода */}
                      <Button
                        variant="primary"
                        onClick={() => {
                          if (isAuth) {
                            this.props.auth.logout();
                            this.props.onMsg('Система: Вы вышли из системы');
                            this.props.onAuth();
                          } else {
                            this.login();
                          }
                        }}
                        disabled={!this.state.successSend}
                        block>{btn}</Button>

                      {/*
                      Если состояние регистрация,
                      то вывести кнопку отмена
                      */}
                      {
                        this.state.formStatus === 'register' && !isAuth &&
                        <Button
                          variant="secondary"
                          name="cancel"
                          onClick={this.handleChangeStatusRegistry}
                          block>Отмена</Button>
                      }
                    </Col>
                  </Row>
                  {
                    /*
                    Если текущее состояние логин, то вывести ссылку
                    с предложение пройти регистрацию
                     */
                    this.state.formStatus === 'login' && !isAuth &&
                    <Row>
                      <Col className="text-center">
                        <a href={'g'}
                           onClick={this.handleChangeStatusRegistry}
                           className="card-link">Нет аккаунта?</a>
                      </Col>
                    </Row>
                  }
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  }
}

/**
 * Интерфейсы компонента
 */
interface Props {
  auth: {
    login: (data: Data, callback: Callback) => void,
    register: (data: Data, callback: Callback) => void,
    logout: () => void,
    isAuthenticated: () => boolean,
    email: () => string
  },
  onAuth: () => void,
  onMsg: (msg: string) => void
}

interface Data {
  email: string,
  password: string
}

interface Callback {
  (response: string): void
}

interface State {
  formStatus: 'login' | 'register',
  form: {
    [name: string]: string
  },
  errorMsg: string,
  successSend: boolean
}