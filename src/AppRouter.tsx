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

// Объект, который содержит пути страниц, их названия для меню и компоненты
const pages: Pages = {
  '/': {
    name: 'Главная',
    component: General
  },
  '/table/': {
    name: 'Таблица',
    component: Table
  },
  '/objects/': {
    name: 'Объекты',
    component: Objects
  },
  '/sigin/': {
    name: 'Авторизация',
    component: SigIn
  }
};

export default function AppRouter () {

  // Массив где будут хранится все страницы
  let routingList: any[] = [];

  // Добавляем главную страницу в массив
  routingList.push(
    <Route path='/' exact component={General} key='/'/>
  );

  // Генерируем все остальные страницы, используя объект pages
  for (let route in pages) {
    if (route !== '/') {
      routingList.push(
        <Route path={route} component={pages[route].component} key={route}/>
      );
    }
  }

  // Генерируем элементы главного меню
  let links: Pages = pages,
    linkRender: any[] = [];

  for (let route in links) {
    linkRender.push(
      <li className="nav-item nav-link" key={route}>
        <Link to={route}>
          {links[route].name}
        </Link>
      </li>
    );
  }

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
            {linkRender}
          </div>
        </div>
      </nav>
      {routingList}
    </Router>
  );
}

export interface Pages {
  [route: string]: {
    name: string,
    component: any
  }
}
