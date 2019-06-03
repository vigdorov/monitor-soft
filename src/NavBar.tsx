import * as React from 'react';
import {BrowserRouter as Route, Link} from "react-router-dom";
import { Pages } from './AppRouter';
import logo from './img/logo.png';

export default class NavBar extends React.Component<Props, {}> {
  render () {
    let links: Pages = this.props.links,
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
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a href="#" className="navbar-brand">
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
    );
  }
}

interface Props {
  links: Pages
}