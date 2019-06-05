// Подключаем React
import * as React from 'react';

// Подключение библиотеки axios
import axios from 'axios';

// Подключаем элементы bootstrap разработанные на React
import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import  {Table as TableBT, Pagination } from 'react-bootstrap';

export default class Table extends React.Component<Props, State> {
  source: any;

  constructor (props: Props) {
    super(props);

    this.state = {
      data: [],
      page: 1,
      totalPages: 4
    };

    this.source = axios.CancelToken.source();
  }

  getData = () => {
    this.setState({
      data: []
    });
    /**
     * Генерируем задержку, для имитации загрузки данных с сервера и
     * демонстрации работы loader'а
     */
    let delay  = Math.floor(Math.random() * 3),
        server = `https://reqres.in/api/page?`,
        url    = `${server}delay=${delay}&page=${this.state.page}`;

    axios.get( url, { cancelToken: this.source.token })
      .then( response => {
        this.setState({
          data: response.data.data,
          page: response.data.page,
          totalPages: response.data['total_pages']
        });
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
        {this.state.data.length ? renderTable : loader}
      </div>
    );
  }
}

interface Props {

}

interface State {
  data: dataPage[],
  page: number,
  totalPages: number
}

interface dataPage {
  [header: string]: (string | number)
}