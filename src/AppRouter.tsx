// Подключаем React
import * as React from 'react';

// Подключаем Router для маршрутизации
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Подключаем наши страницы сайта
import General from './general/General';
import Table from './table/Table';
import Objects from './objects/Objects';
import SigIn from './sigin/SigIn';

// Подключаем логотип страницы
import logo from './img/logo.png';

// Подключаем систему уведомлений
import Notify from './notification/Notify';

// Подключаем авторизацию
import Auth from './sigin/Auth';
const auth = new Auth();

export default class AppRouter extends React.Component<{}, State> {
  notify: Notify;

  constructor (props: {}) {
    super(props);
    this.state = {
      // Состояние входа в систему
      isLogin: false
    };
    // сохраняем систему уведомлений для удобства
    this.notify = Notify.getInstance();
  }

  /**
   * Метод создания уведомления
   *
   * @param {string} msg
   */
  handleNotify = (msg: string) => {
    this.notify.showMessage(msg);
  };

  /**
   * При монтаже компонента, проверяем авторизован ли пользователь
   */
  componentDidMount () {
    this.isAuthenticated();
  }

  /**
   * Метод проверки авторизации пользователя
   */
  isAuthenticated = () => {
    let isAuth = auth.isAuthenticated();
    if ( isAuth !== this.state.isLogin) {
      this.setState({
        isLogin: isAuth
      });
    }
  };

  render () {
    // Ссылки скрытые от неавторизованных пользователей
    let protectedLinks = (
      <React.Fragment>
        <li className="nav-item nav-link">
          <Link to='/table/'>
            Таблицы
          </Link>
        </li>
        <li className="nav-item nav-link">
          <Link to='/objects/'>
            Объекты
          </Link>
        </li>
      </React.Fragment>
    );

    // Страницы скрытые от не авторизованных пользователей
    let protectedPages = (
      <React.Fragment>
        <Route path='/table/' component={() => {
          return <Table onMsg={this.handleNotify}/>
        }} />
        <Route path='/objects/' component={() => {
          return <Objects onMsg={this.handleNotify}/>
        }} />
      </React.Fragment>
    );

    return (
      <Router>

        {/* Верхнее меню приложения */}
        <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">

          {/* Логотип приложения */}
          <a href="/" className="navbar-brand">
            <img src={logo} alt="Monitor Soft" height={50} />
          </a>

          {/* Кнопка открывания меню на мобильных устройствах */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <li className="nav-item nav-link">
                <Link to='/'>
                  Главная
                </Link>
              </li>
              {
                // Если пользователь авторизован показать защищенные ссылки
                this.state.isLogin && protectedLinks
              }
              <li className="nav-item nav-link">
                <Link to='/sigin/'>
                  {
                    // Меняет название ссылки авторизации
                    this.state.isLogin ? 'Личный кабинет' : 'Авторизация'
                  }
                </Link>
              </li>
            </div>
          </div>
        </nav>
        <Route path='/' exact component={() => <General />} />
        {
          // Если пользователь авторизован разрешить переход на защищенные
          // страницы
          this.state.isLogin && protectedPages
        }
        <Route path='/sigin/' component={() => {
          return (
            <SigIn
              auth={auth}
              onAuth={this.isAuthenticated}
              onMsg={this.handleNotify}
            />
          );
        }} />
      </Router>
    );
  }
}

interface State {
  isLogin: boolean
}
