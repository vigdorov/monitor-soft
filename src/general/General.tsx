import * as React from 'react';
import {Card} from 'react-bootstrap';

export default function General () {
  return (
    <div className="container">
      <Card>
        <Card.Header as="h5">Главная</Card.Header>
        <Card.Body>
          <Card.Title>Тестовое задание "Монитор Софт"</Card.Title>
          <Card.Text>
            Задание включает в себя разработку трех страниц: Таблица, Объекты, Авторизация. Для перехода между заданиями - используйте верхнее меню.<br />
            Для полного доступа необходима<strong> авторизация</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
