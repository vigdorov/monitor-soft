export class FactoryHouses {
  /**
   * Класс создания объектов Дом.
   * Способ реализации патерна - Factory.
   */
  private static _instance: FactoryHouses = new FactoryHouses();
  private readonly allInstructions: {
    [name: string]: IHouse
  };
  readonly makeStructure: (buildName: string) => House;


  private constructor () {
    /**
     * Объект, в котором храняться все инструкции для создания домов
     */
    this.allInstructions = {
      garage: {type: 'Гараж', floors: 1, rooms: 1},
      apartment: {type: 'Квартира', floors: 1, rooms: 2},
      house: {type: 'Частный дом', floors: 2, rooms: 4},
    };

    /**
     * Метод создания нужного дома по имени его type (типа)
     *
     * @param {string} buildName - type дома, который нужно создать
     * @returns {House} - возвращает готовый дом
     */
    this.makeStructure = (buildName: string) => {
      let currentInstruction: any;
      for (let key in this.allInstructions) {
        if (buildName === this.allInstructions[key].type) {
          currentInstruction = this.allInstructions[key];
        }
      }
      return new House(currentInstruction);
    }
  }

  /**
   * Метод добавления новой инструкции для постройки здания
   *
   * @param {string} name - уникальное имя инструкции
   * @param {IHouse} newInstruction - тело инструкции
   */
  public addInstruction = (name: string, newInstruction: IHouse) => {
    if (!this.allInstructions[name]) {
      this.allInstructions[name] = {
        ...newInstruction
      };
    } else {
      throw Error('Инструкция "' + name + '" уже существует!');
    }
  };

  /**
   * Метод удаления инструкции по ее имени
   *
   * @param {string} name - имя инструкции, которую нужно удалить
   */
  public deleteInstruction = (name: string) => {
    delete this.allInstructions[name];
  };

  /**
   * Метод, который возвращает список всех 'type' инструкций
   * пример: ['Гараж', 'Дом', 'Студия']
   *
   * @returns {string[]}
   */
  public getNamesInstructions = () => {
    let result: string[] = [];

    for (let key in this.allInstructions) {
      result.push(
        this.allInstructions[key].type
      );
    }

    return result;
  };

  /**
   * Метод возвращает объект FactoryHouses.
   * Способ реализации патерна - Singleton
   *
   * @returns {FactoryHouses}
   */
  public static getInstance () {
    return FactoryHouses._instance;
  }
}

class House {
  /**
   * Класс создания объекта дом
   */
  private readonly _type: string;
  private _floors: number;
  private _rooms: number;

  constructor (props: IHouse) {
    /**
     * @type {string} _type - тип дома
     * @private
     */
    this._type = props.type;

    /**
     * @type {string} _floors - количество этажей дома
     * @private
     */
    this._floors = props.floors;

    /**
     * @type {string} _rooms - количество комнат дома
     * @private
     */
    this._rooms = props.rooms;
  }

  /**
   * @returns {string} - возвращает тип дома
   */
  public get type () {
    return this._type;
  }

  /**
   * @returns {number} - возвращает количество этажей дома
   */
  public get floors () {
    return this._floors;
  }

  /**
   * @returns {number} - возвращает количество комнат дома
   */
  public get rooms () {
    return this._rooms;
  }

  /**
   * Метод изменения количества этажей дома
   *
   * @param {number} count
   */
  public set floors (count: number) {
    this._floors = count;
  }

  /**
   * Метод изменения количества комнат дома
   *
   * @param {number} count
   */
  public set rooms (count: number) {
    this._rooms = count;
  }
}

/**
 * Интерфейс объекта дом
 */
export interface IHouse {
  type: string,
  floors: number,
  rooms: number,
}
