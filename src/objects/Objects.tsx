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
  modalCheckForm: {
    [name: string]: boolean
  };

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
      modalEditFloors: '',
      modalEditSuccess: true
    };

    // Объект хранит информацию, корректно ли заполнены поля редактирования
    this.modalCheckForm = {
      modalEditRooms: true,
      modalEditFloors: true
    }
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

    this.props.onMsg('Объект "' + houseName + '" построен.');

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
      this.props.onMsg('Объект "' + editHouse.type + '" отредактирован.');
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
      this.props.onMsg('Объект "' + newData[id].type + '" удален.');
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
   * Метод проверяет корректно ли заполнены все поля при редактировании
   * объекта и меняет состояние кнопки разрешено\запрещено
   */
  handleCheckForm = () => {
    let check = true,
      form  = this.modalCheckForm;

    for (let name in form) {
      if (!form[name]) {
        check = false;
      }
    }

    if (check !== this.state.modalEditSuccess) {
      this.setState({
        modalEditSuccess: check
      });
    }
  };

  /**
   * Метод меняет состояние корректности заполнения конкретного поля,
   * и запускает общую проверку можно ли сохранять данные формы редактирования
   * объекта
   *
   * @param {string} name - имя формы
   * @param {boolean} variant - правильно ли заполнена
   */
  handleChangeCheckForm = (name: string, variant: boolean) => {
    this.modalCheckForm[name] = variant;
    this.handleCheckForm();
  };

  /**
   * Метод проверки полей ввода для формы редактирования домов
   *
   * @param {string} inputValue - значение поля для проверки
   * @returns {string} - возвращает сообщение об ошибке, если условия
   *                     заполнения поля нарушены
   */
  handleCheckInput = (e: any, inputValue: string) => {
    if (inputValue === '') {
      this.handleChangeCheckForm(e.target.id, false);
      return 'Поле не должно быть пустым!';
    }
    if (isNaN(Number(inputValue))) {
      this.handleChangeCheckForm(e.target.id, false);
      return 'Допускаются только числа!';
    }
    if (Number(inputValue) < 1 || Number(inputValue) > 10) {
      this.handleChangeCheckForm(e.target.id, false);
      return 'Значение не может быть меньше 1 и больше 10!';
    }
    this.handleChangeCheckForm(e.target.id, true);
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
    // Инициализируем данный карточек
    let data = this.state.data,
        objectCards: any[] = [];

    // Запускаем цикл создания карточек объектов
    for (let key in data) {
      let imgSrc = '',
          item = data[key];

      // Определяем какую картинку выбрать для карточки
      if (item.type === 'Гараж') imgSrc = garage;
      else if (item.type === 'Квартира') imgSrc = apartment;
      else if (item.type === 'Частный дом') imgSrc = house;

      // Создаем карточку объекта
      objectCards.push(
        <Col
          xs={12} sm={6} lg={4} key={key}
          style={ {marginTop: '20px'} }
        >
          <Card>
            <Card.Img variant="top" src={imgSrc}/>
            <Card.Body>

              {/* Заголовок карточки */}
              <Card.Title>{item.type}</Card.Title>

              {/* Тело карточки */}
              <Card.Text>
                Комнат: <b>{item.rooms}</b>, Этажей: <b>{item.floors}</b>
              </Card.Text>

              {/* Кнопка редактирования объекта */}
              <Button
                variant="warning"
                onClick={() => {
                  this.handleShowHideEditModal(true);
                  this.modalCheckForm = {
                    modalEditRooms: true,
                    modalEditFloors: true
                  };
                  this.handleCheckForm();
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

              {/* Кнопка удаления объекта */}
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

        {/* Модальное окно редактирования объекта */}
        <Modal
          show={this.state.modalEditShow}
          onHide={() => this.handleShowHideEditModal(false)}>

          {/* Заголовок модально окна */}
          <Modal.Header closeButton>
            <Modal.Title>Редактировать здание</Modal.Title>
          </Modal.Header>

          {/* Тело модально окна */}
          <Modal.Body>
            <Form>

              {/* поле ввода с указанием Типа объекта */}
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Тип объекта: </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.state.modalEditType}
                  disabled/>
              </Form.Group>

              {/* поле ввода с указанием количества комнат */}
              <FormGroup
                id='modalEditRooms'
                type='text'
                label="Количество комнат:"
                value={this.state.modalEditRooms}
                placeholder="Введите количество комнат"
                checkInputFunction={this.handleCheckInput}
                getInputValue={this.handleGetInputValue}
              />

              {/* поле ввода с указанием количества этажей */}
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

          {/* кнопки модального окна */}
          <Modal.Footer>

            {/* кнопка отмены редактирования */}
            <Button
              variant="secondary"
              onClick={() => this.handleShowHideEditModal(false)}
            >
              Отмена
            </Button>

            {/* кнопка подтверждения редактирования */}
            <Button
              variant="primary"
              onClick={this.handleEditHouse}
              disabled={!this.state.modalEditSuccess}
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
  modalEditFloors: string,
  modalEditSuccess: boolean
}

interface Props {
  onMsg: (msg: string) => void
}