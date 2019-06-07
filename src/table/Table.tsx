// Подключаем React
import * as React from 'react';

// Подключение библиотеки axios
import axios from 'axios';

// Подключаем элементы bootstrap разработанные на React
import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import { Table as TableBT, Pagination } from 'react-bootstrap';

export default class Table extends React.Component<Props, State> {
  /**
   * Компонент (страница) отрисовки таблицы
   */
  source: any;

  constructor (props: Props) {
    super(props);

    this.state = {
      // массив данных текущей страницы таблицы
      data: [],
      // номер текущей страницы
      page: 1,
      // общее количество страниц
      totalPages: 4
    };

    // кенсел-токен запроса к серверу, чтобы использовать его в случае
    // перехода пользователя на другую страницу до окончания загрузки
    this.source = axios.CancelToken.source();
  }

  /**
   * Метод получения данных таблицы с сервера
   */
  getData = () => {
    // Очищаем данные таблицы, чтобы показался Лоадер
    this.setState({
      data: []
    });
    /**
     * Генерируем задержку, для имитации загрузки данных с сервера и
     * демонстрации работы loader'а
     */
    let delay  = Math.floor(Math.random() * 3),
      server = `https://reqres.in/api/page?`,
      url    = `${server}delay=${delay}&page=${this.state.page}`,
      // сохраняем время начала запроса
      timer  = new Date().getTime();

    axios.get( url, { cancelToken: this.source.token })
      .then( response => {
        this.setState({
          data: response.data.data,
          page: response.data.page,
          totalPages: response.data['total_pages']
        });
        // высчитываем время запроса и выводим его в уведомлениях
        let endTimer = (new Date().getTime() - timer) / 1000;
        this.props.onMsg('Данные таблицы получены за ' + endTimer + ' секунд.');
      })
      .catch( error => {
        console.log();
      });
  };

  /**
   * Метод переключения страницы таблицы, по завершению которого выполняется
   * повторный запрос к серверу
   *
   * @param {number} pageNumber
   */
  handleChangePage = (pageNumber: number) => {
    this.setState({
      page: pageNumber
    }, this.getData);
  };

  /**
   * При монтировании компонента выполняет первичный запрос к серверу
   * для полученния данных первой страницы таблицы
   */
  componentDidMount () {
    this.getData();
  }

  /**
   * При размонтировании компонента отменяем запрос к серверу,
   * если они существуют
   */
  componentWillUnmount () {
    this.source.cancel('Запрос отменен из-за переключения вкладки');
  }

  render () {
    let data = this.state.data,
        headers: any[] = [],
        body: any[] = [],
        paginationItems: any[] = [];

    /**
     * Заполняем заголовок таблицы
     */
    for (let key in data[0]) {
      headers.push(
        <th key={key}>{key}</th>
      );
    }

    /**
     * Заполняем тело таблицы, сперва создаем строки, а после кладем в них
     * ячейки с нужными значениями
     */
    data.forEach( (row: any, i: number) => {
      let tr: any[] = [];

      for (let key in row) {
        tr.push(
          <td key={i + key}>
            {row[key]}
          </td>
        );
      }

      body.push(<tr key={i}>{tr}</tr>);
    });

    /**
     * Генерируем кнопки пагинации
     */
    for (let i = 1; i <= this.state.totalPages; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === this.state.page}
          onClick={() => this.handleChangePage(i)}>
          {i}
        </Pagination.Item>
      );
    }

    // Складываем таблицу для удобства в переменную
    let renderTable = (
      <Container>
        <TableBT striped bordered hover responsive>
          <thead>
          <tr>
            {headers}
          </tr>
          </thead>
          <tbody>
          {body}
          </tbody>
        </TableBT>
        <Row className="justify-content-center">
          <Pagination>{paginationItems}</Pagination>
        </Row>
      </Container>
    );

    // Создаем лоадер
    let loader = (
      <Container>
        <Row className="justify-content-center">
          <Alert variant="success">
            <Alert.Heading>Подождите... <Spinner animation="border" variant="info" /></Alert.Heading>
            <p>
              Таблица с данными загружается
            </p>
          </Alert>
        </Row>
      </Container>
    );

    return (
      <div className="container">
        {
          // Если идет запрос к серверу, то показываем лоадер, если данные
          // получены, то выводим таблицу
          this.state.data.length ? renderTable : loader
        }
      </div>
    );
  }
}

interface Props {
  onMsg: (msg: string) => void
}

interface State {
  data: dataPage[],
  page: number,
  totalPages: number
}

interface dataPage {
  [header: string]: (string | number)
}