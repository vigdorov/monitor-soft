// Подключаем React
import * as React from 'react';

// Подключение bootstrap элементов на основе React
import { Card } from 'react-bootstrap';

// Подключаем axios для получения аккаунтов, у которых есть доступ к сайту
import axios from 'axios';


export default class General extends React.Component<{}, State> {
  /**
   * Компонент главной страницы
   */
  constructor (props: {}) {
    super(props);
    this.state = {
      // Список e-mail'ов у которых есть доступ к сайту
      accounts: []
    };
  }

  /**
   * При монтаже компонента получаем список e-mail'ов
   */
  componentDidMount () {
    let pages: number,
        promises: any[] = [],
        acc: any[] = [];

    axios('https://reqres.in/api/users?page=1')
      .then( (response: any) => {
        pages = response.data.total_pages;
        for (let i = 1; i <= pages; i++) {
          promises.push(
            axios('https://reqres.in/api/users?page=' + i)
              .then( (response: any) => {
                for (let i = 0; i < 3; i++) {
                  acc.push(response.data.data[i].email);
                }
              })
          );
        }
        axios.all(promises).then( () => {
          this.setState({
            accounts: acc
          });
        });
      });
  }

  /**
   * Передает в React JSX код для рендера
   *
   */
  render () {
    // Формируем список готовых элементов email для рендера
    let accs = this.state.accounts.map( (email, key) => {
      return <span key={key}>
        {email}{key !== 11 && ', '}
        </span>
    });

    return (
      <div className="container">
        <Card>
          <Card.Header as="h5">Главная</Card.Header>
          <Card.Body>
            <Card.Title>Тестовое задание "Монитор Софт"</Card.Title>
            <Card.Text>
              Задание включает в себя разработку трех страниц: Таблица, Объекты, Авторизация. Для перехода между заданиями - используйте верхнее меню.<br />
            </Card.Text>
            <p>Для полного доступа необходима <strong>авторизация</strong> или <strong>регистрация</strong>. Используйте следующие аккаунты:</p>
            {accs}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

interface State {
  accounts: string[],
}
