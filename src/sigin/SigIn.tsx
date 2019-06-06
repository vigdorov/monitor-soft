import * as React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import FormGroup from '../objects/FormGroup';

export default class SigIn extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props);
    this.state = {
      formStatus: 'login',
      form: {
        email: '',
        password: '',
        retryPassword: ''
      },
      errorMsg: ''
    };
  }

  handleChangeStatusRegistry = (e: any) => {
    e.preventDefault();
    let status: 'register' | 'login' = 'register';
    if (e.target.name === 'cancel') {
      status = 'login'
    }
    this.setState({
      formStatus: status
    });
  };

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

  handleCheckInput = (inputValue: string) => {
    if (!inputValue) {
      return 'Заполните поле!'
    }
    return '';
  };

  handleCheckInputRetryPassword = (inputValue: string) => {
    if (inputValue !== this.state.form.password) {
      return 'Пароли не совпадают!'
    }
    return '';
  };

  login = () => {
    let callback = (response: string) => {
      if (response === this.state.form.email) {
        this.props.onAuth();
        this.props.onMsg('Добро пожаловать: ' + this.state.form.email);
      } else {
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
          } else {
            msg = systemMsg;
          }
          this.props.onMsg(msg);
          //
        });
      }
    };

    let data = {
      email: this.state.form.email,
      password: this.state.form.password
    };

    if (this.state.formStatus === 'login') {
      this.props.auth.login(data, callback);
    } else {
      this.props.auth.register(data, callback);
    }
  };

  render () {
    let isAuth = this.props.auth.isAuthenticated();

    let title = 'Личный кабинет',
        btn = 'Выйти';
    if (!isAuth) {
      let status = this.state.formStatus;

      if (status === 'login') {
        title = 'Авторизация';
        btn = 'Войти';
      } else {
        title = 'Регистрация';
        btn = 'Регистрация';
      }
    }

    let login = (
      <React.Fragment>
          <FormGroup
            id='email'
            type='text'
            label='E-mail:'
            placeholder='Введите e-mail'
            value={this.state.form.email}
            checkInputFunction={this.handleCheckInput}
            getInputValue={this.handleGetInput}
          />
          <FormGroup
            id='password'
            type='password'
            label='Пароль:'
            placeholder='Введите пароль'
            value={this.state.form.password}
            checkInputFunction={this.handleCheckInput}
            getInputValue={this.handleGetInput}/>
          {
            this.state.formStatus === 'register' &&
            <FormGroup
              id='retryPassword'
              type='password'
              label='Повторите пароль:'
              placeholder='Повторите пароль'
              value={this.state.form.retryPassword}
              checkInputFunction={this.handleCheckInputRetryPassword}
              getInputValue={this.handleGetInput}/>
          }
      </React.Fragment>
    );

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
                  {
                    !isAuth && login
                  }
                  {
                    isAuth && welcome
                  }
                  <Row className="justify-content-center">
                    <Col md={6} xs={8}>
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
                        block>{btn}</Button>
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
  errorMsg: string
}