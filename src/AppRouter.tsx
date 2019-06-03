import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import General from './general/General';
import Table from './table/Table';
import Objects from './objects/Objects';
import SigIn from './sigin/SigIn';
import logo from './img/logo.png';

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

  let routingList: any[] = [];

  routingList.push(
    <Route path='/' exact component={General} key='/'/>
  );

  for (let route in pages) {
    if (route !== '/') {
      routingList.push(
        <Route path={route} component={pages[route].component} key={route}/>
      );
    }
  }

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
