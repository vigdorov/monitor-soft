import * as React from 'react';
import {Button, Modal, Form} from 'react-bootstrap';

export default class AddObject extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props);
    this.state = {
      show: false,
      choice: 0,
    }
  }

  handleClose = () => {
    this.setState({
      show: false,
      choice: 0
    });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleChange = (e: any) => {
    let {value} = e.target;
    this.setState({
      choice: value
    });
  };

  render () {
    return (
      <React.Fragment>
        <Button variant="success" onClick={this.handleShow}>
          Создать объект
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Создать объект</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect">
                <Form.Label>Выберете объект, который нужно построить:</Form.Label>
                <Form.Control as="select" onChange={this.handleChange}>
                  <option value={0}>Гараж</option>
                  <option value={1}>Квартира</option>
                  <option value={2}>Частный дом</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Отмена
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.props.onCreateHouse(Number(this.state.choice));
                this.handleClose();
              }}>
              Создать
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

interface Props {
  onCreateHouse: (choice: number) => void;
}

interface State {
  show: boolean,
  choice: number
}