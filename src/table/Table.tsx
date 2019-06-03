import * as React from 'react';
import axios from 'axios';
import {Table as TableBT, Pagination, Row, Container, Spinner, Alert} from 'react-bootstrap';

export default class Table extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props);

    this.state = {
      data: [],
      page: 1,
      totalPages: 4
    }
  }

  getData = () => {
    this.setState({
      data: []
    });
    setTimeout( () => {
      axios.get('https://reqres.in/api/page=?page=' + this.state.page)
        .then( response => {
          this.setState({
            data: response.data.data,
            page: response.data.page,
            totalPages: response.data['total_pages']
          });
        });
    }, 1000);

  };

  handleChangePage = (pageNumber: number) => {
    this.setState({
      page: pageNumber
    }, this.getData);
  };

  componentDidMount () {
    this.getData();
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