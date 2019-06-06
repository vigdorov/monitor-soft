// Подключение React
import * as React from 'react';

// Подключение bootstrap элементов на основе React
import { Container, Row, Col } from 'react-bootstrap';
import { Card, Button, Modal, Form } from 'react-bootstrap';

// Подключение фабрики домов и модуля создания домов
import { FactoryHouses, IHouse as House } from './FactoryHouses';
import AddObject from './AddObject';

// Подключение картинок для домов
import garage from '../img/garage.jpg';
import apartment from '../img/apartment.jpg';
import house from '../img/house.jpg';

// Подключение модуля формы ввода
import FormGroup from "./FormGroup";


export default class Objects extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props);
    this.state = {
      // Объект, в котором хранятся созданные экземпляры домов
      data: {},
      // Счетчик созданных домов, используется для назначения id домам
      idCounter: 0,
      // Инициализация объекта фабрики домов
      factory: FactoryHouses.getInstance(),
      // Параметры для работы с Модальным окном редактирования домов
      modalEditShow: false,
      modalEditKey: 0,
      modalEditType: '',
      modalEditRooms: '',
      modalEditFloors: ''
    };
  }

  /**
   * Метода потройки дома
   *
   * @param {number} choice - принимает номер инструкции, по которой
   *                          нужно построить дом
   */
  handleCreateHouse = (choice: number) => {
    let houseName = this.state.factory.getNamesInstructions()[choice],
        newHouse = this.state.factory.makeStructure(houseName);

    this.setState( (prevState) => {
      let newData = {...prevState.data};
      newData[prevState.idCounter] = newHouse;
      return {
        data: newData,
        idCounter: prevState.idCounter + 1
      };
    });
  };

  /**
   * Метод изменения параметров дома, в качестве данных использует state
   */
  handleEditHouse = () => {
    this.setState( prevState => {
      let editHouse = prevState.data[prevState.modalEditKey];
      editHouse.rooms = Number(prevState.modalEditRooms);
      editHouse.floors = Number(prevState.modalEditFloors);
      return {
        data: {
          ...prevState.data
        }
      };
    });
    this.handleShowHideEditModal(false);
  };

  /**
   * Метод удаления дома
   *
   * @param {number} id - уникальный номер дома, выданный ему при создании
   */
  handleDeleteHouse = (id: number) => {
    this.setState( prevState => {
      let newData = {...prevState.data};
      delete newData[id];
      return {
        data: newData
      };
    });
  };

  /**
   * Метод показа\скрытия Модального окна для редактирования домов
   *
   * @param {boolean} choice - показать\скрыть окно
   */
  handleShowHideEditModal = (choice: boolean) => {
    this.setState({
      modalEditShow: choice
    });
  };

  /**
   * Метод проверки полей ввода для формы редактирования домов
   *
   * @param {string} inputValue - значение поля для проверки
   * @returns {string} - возвращает сообщение об ошибке, если условия
   *                     заполнения поля нарушены
   */
  handleCheckInput = (inputValue: string) => {
    if (inputValue === '') {
      return 'Поле не должно быть пустым!';
    }
    if (isNaN(Number(inputValue))) {
      return 'Допускаются только числа!';
    }
    if (Number(inputValue) < 1 || Number(inputValue) > 10) {
      return 'Значение не может быть меньше 1 и больше 10!';
    }
    return '';
  };

  /**
   * Метод получения данных из поля ввода формы редактирования дома,
   * данные сохраняются в state
   *
   * @param event - объект события
   */
  handleGetInputValue = (event: any) => {
    let id     = event.target.id,
         value = event.target.value;
    if (id === 'modalEditRooms') {
      this.setState({ modalEditRooms: value });
    }
    if (id === 'modalEditFloors') {
      this.setState({ modalEditFloors: value });
    }
  };

  /**
   * Метод отрисовки элементов
   *
   * @returns {any} - возвращает JSX модуль для рендера
   */
  render () {
    let data = this.state.data,
        objectCards: any[] = [];

    for (let key in data) {
      let imgSrc = '',
          item = data[key];

      if (item.type === 'Гараж') imgSrc = garage;
      else if (item.type === 'Квартира') imgSrc = apartment;
      else if (item.type === 'Частный дом') imgSrc = house;

      objectCards.push(
        <Col
          xs={12} sm={6} lg={4} key={key}
          style={ {marginTop: '20px'} }
        >
          <Card>
            <Card.Img variant="top" src={imgSrc}/>
            <Card.Body>
              <Card.Title>{item.type}</Card.Title>
              <Card.Text>
                Комнат: <b>{item.rooms}</b>, Этажей: <b>{item.floors}</b>
              </Card.Text>
              <Button
                variant="warning"
                onClick={() => {
                  this.handleShowHideEditModal(true);
                  this.setState({
                    modalEditKey: Number(key),
                    modalEditType: data[key].type,
                    modalEditRooms: String(data[key].rooms),
                    modalEditFloors: String(data[key].floors)
                  });
                }}
              >
                Изменить
              </Button>
              <span> </span>
              <Button
                variant="danger"
                onClick={() => this.handleDeleteHouse(Number(key))}
              >
                Удалить
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    }

    return (
      <Container>
        <AddObject onCreateHouse={this.handleCreateHouse}/>
        <Row>
          { objectCards }
        </Row>

        <Modal
          show={this.state.modalEditShow}
          onHide={() => this.handleShowHideEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Редактировать здание</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Тип объекта: </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.state.modalEditType}
                  disabled/>
              </Form.Group>
              <FormGroup
                id='modalEditRooms'
                type='text'
                label="Количество комнат:"
                value={this.state.modalEditRooms}
                placeholder="Введите количество комнат"
                checkInputFunction={this.handleCheckInput}
                getInputValue={this.handleGetInputValue}
              />
              <FormGroup
                id='modalEditFloors'
                type='text'
                label="Количество этажей:"
                value={this.state.modalEditFloors}
                placeholder="Введите количество этажей"
                checkInputFunction={this.handleCheckInput}
                getInputValue={this.handleGetInputValue}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleShowHideEditModal(false)}
            >
              Отмена
            </Button>
            <Button
              variant="primary"
              onClick={this.handleEditHouse}
            >
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

/**
 * Интерфейс объекта State
 */
interface State {
  data: {
    [id: number]: House
  },
  idCounter: number,
  factory: FactoryHouses,
  modalEditShow: boolean,
  modalEditKey: number,
  modalEditType: string,
  modalEditRooms: string,
  modalEditFloors: string
}

interface Props {
  onMsg: (msg: string) => void
}