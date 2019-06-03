export default class FactoryHouses {
  private static _instance: FactoryHouses = new FactoryHouses();
  readonly makeGarage: () => House;
  readonly makeApartment: () => House;
  readonly makeHouse: () => House;

  private constructor () {
    this.makeGarage = () => new House({
      type: 'Гараж',
      floors: 1,
      rooms: 1,
      maxFloors: 1,
      maxRooms: 2
    });
    this.makeApartment = () => new House({
      type: 'Квартира',
      floors: 1,
      rooms: 2,
      maxFloors: 2,
      maxRooms: 5
    });
    this.makeHouse = () => new House({
      type: 'Частный дом',
      floors: 2,
      rooms: 4,
      maxFloors: 5,
      maxRooms: 15
    });
  }

  public static getInstance () {
    return FactoryHouses._instance;
  }
}

class House {
  private readonly _type: string;
  private _floors: number;
  private _rooms: number;
  private readonly _maxFloors: number;
  private readonly _maxRooms: number;

  constructor (props: HouseProps) {
    this._type = props.type;
    this._floors = props.floors;
    this._rooms = props.rooms;
    this._maxFloors = props.maxFloors;
    this._maxRooms = props.maxRooms;
  }

  public get type () {
    return this._type;
  }

  public get floors () {
    return this._floors;
  }

  public get rooms () {
    return this._rooms;
  }

  public get fullSpecification () {
    return {
      type: this._type,
      floors: this._floors,
      rooms: this._rooms
    }
  }

  public onChangeRooms (count: number) {
    let changeRooms = this._rooms + count;
    if (changeRooms > 0 && changeRooms <= this._maxRooms) {
      this._rooms = changeRooms;
    }
  }

  public onChangeFloors (count: number) {
    let changeFloors = this._floors + count;
    if (changeFloors > 0 && changeFloors <= this._maxFloors) {
      this._floors = changeFloors;
    }
  }
}

interface HouseProps {
  type: string,
  floors: number,
  rooms: number,
  maxFloors: number,
  maxRooms: number
}
