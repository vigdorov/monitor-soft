// Подключение React
import * as React from 'react';

// Подключение bootstrap на основе React
import { Button, Modal, Form } from 'react-bootstrap';

// Подключение фабрики создания домов
import { FactoryHouses } from './FactoryHouses';

export default class AddObject extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props);

    /**
     *
     * @param {FactoryHouses} factory - объект фабрики домов
     * @param {boolean} show - показывать\не показывать Модальное окно
     * @param {number} choice - состояние выбора дома для постройки
     */
    this.state = {
      factory: FactoryHouses.getInstance(),
      show: false,
      choice: 0,
    };
  }

  /**
   * Метод закрывает Модальное окно создания дома и
   * сбрасывает его состояние на изначальное
   */
  handleClose = () => {
    this.setState({
      show: false,
      choice: 0
    });
  };

  /**
   * Метод показывает Модальное окно создания дома
   */
  handleShow = () => {
    this.setState({ show: true });
  };

  /**
   * Метод изменения состояния текущего выбора дома для построки
   *
   * @param e - объект события
   */
  handleChange = (e: any) => {
    let {value} = e.target;
    this.setState({
      choice: value
    });
  };

  /**
   * Метод отрисовки кнопки и Модального окна создания дома
   *
   * @returns {any} - возвращает объект JSX для рендера
   */
  render () {

    return (
      <React.Fragment>
        <Button variant="success" onClick={this.handleShow}>
          Построить здание
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Построить здание</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect">
                <Form.Label>Выберете здание, которое нужно построить:</Form.Label>
                <Form.Control as="select" onChange={this.handleChange}>
                  {
                    // Создаем список домов
                    this.state.factory.getNamesInstructions().map(
                      (name, i) => (<option key={i} value={i}>{name}</option>)
                    )
                  }
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
                this.props.onCreateHouse(this.state.choice);
                this.handleClose();
              }}>
              Построить
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
  factory: FactoryHouses,
  show: boolean,
  choice: number
}