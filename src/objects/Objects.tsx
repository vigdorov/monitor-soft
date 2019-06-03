import * as React from 'react';
import {Container, Card, Button, Row, Col} from "react-bootstrap";
import FactoryHouses from './FactoryHouses';
import AddObject from './AddObject';
import ModalEdit from './ModalEdit';
import garage from '../img/garage.jpg';
import apartment from '../img/apartment.jpg';
import house from '../img/house.jpg';

export default class Objects extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props);
    this.state = {
      data: {},
      idCounter: 0,
      factory: FactoryHouses.getInstance(),
      modalEditShow: false
    };
  }

  handleCreateHouse = (choice: number) => {
    let newHouse: any;

    if (choice === 0) newHouse = this.state.factory.makeGarage();
    else if (choice === 1) newHouse = this.state.factory.makeApartment();
    else if (choice === 2) newHouse = this.state.factory.makeHouse();

    this.setState( (prevState) => {
      let newData = {...prevState.data};
      newData[prevState.idCounter] = newHouse;
      return {
        data: newData,
        idCounter: prevState.idCounter + 1
      };
    });
  };

  handleModalEditClose = () => {
    this.setState({modalEditShow: false});
  };

  handleModalEditShow = (id: number) => {
    this.setState((prevState) => {
      return {
        modalEditShow: true,
        modalData: prevState.data[id]
      };
    });
  };

  handleEditHouse = (rooms: string, floors: string) => {

  };

  handleDeleteHouse = (id: number) => {
    this.setState( prevState => {
      let newData = {...prevState.data};
      delete newData[id];
      return {
        data: newData
      };
    });
  };

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
        <Col xs={12} sm={6} lg={4} key={key}>
          <Card>
            <Card.Img variant="top" src={imgSrc}/>
            <Card.Body>
              <Card.Title>{item.type}</Card.Title>
              <Card.Text>
                Комнат: <b>{item.rooms}</b>, Этажей: <b>{item.floors}</b>
              </Card.Text>
              <Button
                variant="warning"
                //onClick={() => this.handleEditHouse(Number(key))}
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
          {objectCards}
        </Row>
        {/*<ModalEdit
          show={this.state.modalEditShow}
          editItem={this.state.modalData}
          onClose={this.handleModalEditClose}
          onEdit={this.handleEditHouse}
        />*/}
      </Container>
    );
  }
}

interface Props {

}

interface State {
  data: {
    [id: number]: House
  },
  idCounter: number,
  factory: FactoryHouses,
  modalEditShow: boolean,
  modalData?: House
}

interface House {
  type: string,
  floors: number,
  rooms: number,
  fullSpecification: () => {
    type: string,
    floors: number,
    rooms: number,
  },
  onChangeRooms: (count: number) => void,
  onChangeFloors: (count: number) => void
}