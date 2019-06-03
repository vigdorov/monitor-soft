import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from './NavBar'
import General from './general/General';
import Table from './table/Table';
import Objects from './objects/Objects';
import SigIn from './sigin/SigIn';

const pages: Pages = {
  '/': {
    name: 'General',
    component: General
  },
  '/table/': {
    name: 'Table',
    component: Table
  },
  '/objects/': {
    name: 'Objects',
    component: Objects
  },
  '/sigin/': {
    name: 'SigIn',
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

  return (
    <Router>
      <NavBar links={pages}/>
      {routingList}
    </Router>
  );
}

export interface Pages {
  [route: string]: {
    name: string,
    component: () => JSX.Element
  }
}
