import * as React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import FormGroup from '../objects/FormGroup';

export default class SigIn extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleGetInput = (e: any) => {
    let id: string    = e.target.id,
        value = e.target.value;

    this.setState({
      [id]: value
    });
  };

  handleCheckInput = (inputValue: string) => {
    if (!inputValue) {
      return 'Заполните поле!'
    }
    return '';
  };

  render () {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col lg={4} sm={6} xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>Авторизация</Card.Title>
                <Form>
                  <FormGroup
                    id='email'
                    type='text'
                    label='E-mail:'
                    placeholder='Введите e-mail'
                    value={this.state.email}
                    checkInputFunction={this.handleCheckInput}
                    getInputValue={this.handleGetInput}/>
                  <FormGroup
                    id='password'
                    type='password'
                    label='Пароль:'
                    placeholder='Введите пароль'
                    value={this.state.password}
                    checkInputFunction={this.handleCheckInput}
                    getInputValue={this.handleGetInput}/>
                  <Row className="justify-content-center">
                    <Col md={6} xs={8}>
                      <Button variant="primary" block>Войти</Button>
                    </Col>
                  </Row>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  }
}

interface Props {

}

interface State {
  [name: string]: string
}