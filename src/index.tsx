// Подключаем bootstrap к проекту
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// Подключаем bootstrap компоненты разработанные на React
import 'react-bootstrap';

// Подключаем React
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Подключаем наше основное приложение
import AppRouter from './AppRouter';

// Подключаем пользовательские стили
import './index.css';

// Запускаем рендер нашего основного приложения
ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
