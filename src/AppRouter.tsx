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
import Notify from './notification/notify';

// Подключаем авторизацию
import Auth from './sigin/Auth';

const auth = new Auth();

export default class AppRouter extends React.Component<{}, State> {

  constructor (props: {}) {
    super(props);
    this.state = {
      isLogin: false,
      messages: {
        counter: 0,
        data: {}
      }
    };
  }

  componentDidMount () {
    this.isAuthenticated();
  }

  handleNotify = (msg: string) => {
    let id: number;
    this.setState( prevState => {
      id = prevState.messages.counter;
      return {
        messages: {
          ...prevState.messages,
          counter: id + 1,
          data: {
            ...prevState.messages.data,
            [id]: msg
          }
        }
      };
    }, () => {
      setTimeout( () => {
        delete this.state.messages.data[id];
      }, 5000);
    });
  };

  isAuthenticated = () => {
    let isAuth = auth.isAuthenticated();
    if ( isAuth !== this.state.isLogin) {
      this.setState({
        isLogin: isAuth
      });
    }
  };

  render () {
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

    let protectedPages = (
      <React.Fragment>
        <Route path='/table/' component={() => {
          return <Table />
        }} />
        <Route path='/objects/' component={() => {
          return <Objects onMsg={this.handleNotify}/>
        }} />
      </React.Fragment>
    );

    return (
      <Router>
        <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
          <a href="/" className="navbar-brand">
            <img src={logo} alt="Monitor Soft" height={50} />
          </a>
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
                this.state.isLogin && protectedLinks
              }
              <li className="nav-item nav-link">
                <Link to='/sigin/'>
                  {this.state.isLogin ? 'Личный кабинет' : 'Авторизация'}
                </Link>
              </li>
            </div>
          </div>
        </nav>
        <Route path='/' exact component={() => <General />} />
        {
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
        <Notify messages={this.state.messages.data} />
      </Router>
    );
  }
}

interface State {
  isLogin: boolean,
  messages: {
    counter: number,
    data: {
      [id: number]: string
    }
  }
}
