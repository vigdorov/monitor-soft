// Подключаем axios
import axios from 'axios';

export default class Auth {
  /**
   * Объект авторизации на сайте
   */
  private _token: string;
  private _expireAt: number;
  private _email: string;

  constructor () {
    /**
     * @type {string} _token - Хранит токен авторизованного пользователя
     * @private
     */
    this._token = '';
    /**
     * @type {number} _expireAt - хранит дату, когда заканчивается срок
     *                            авторизации на сайте
     * @private
     */
    this._expireAt = new Date().getTime();
    /**
     * @type {string} _email - хранит e-mail авторизованного пользователя
     * @private
     */
    this._email = '';
  }

  /**
   * Метод авторизации пользователя
   *
   * @param {LoginData} data - объект с email и password пользователя
   * @param {Callback} callback - коллбек, который необходимо запустить по
   *                              окончанию авторизации
   */
  public login = (data: LoginData, callback: Callback) => {

    axios.post('https://reqres.in/api/login', data)
      .then( response => {
        let token = response.data.token,
            email = JSON.parse(response.config.data).email;

        this.setSession({ token, email });
        callback(email);
      })
      .catch( error => {
        callback(error.response.data.error);
      });
  };

  /**
   * Метод регистрации пользователя
   *
   * @param {LoginData} data - объект с email и password пользователя
   * @param {Callback} callback - коллбек, который необходимо запустить по
   *                              окончанию авторизации
   */
  public register = (data: LoginData, callback: Callback) => {
    axios.post('https://reqres.in/api/register', data)
      .then( response => {
        let token = response.data.token,
          email = JSON.parse(response.config.data).email;

        this.setSession({ token, email });
        callback(email);
      })
      .catch( error => {
        callback(error.response.data.error);
      });
  };

  /**
   * Метод установки сессии авторизации
   *
   * @param authResult - данные пользователя
   */
  private setSession = (authResult: any) => {
    // Сохраняем токен
    this._token = authResult.token;
    // Генерируем срок сессии 60 минут
    this._expireAt = new Date().getTime() + (1000 * 360 * 60);
    // Сохраняем е-майл
    this._email = authResult.email;

    // Подготавливаем данные для сохранени в LocalStorage
    let data = {
      _token: this._token,
      _expireAt: this._expireAt,
      _email: this._email
    };

    // Сохраняем данные сессии в LocalStorage
    localStorage.setItem('isLoggedIn', JSON.stringify(data));
  };

  /**
   * Метод выхода из сессии
   */
  public logout = () => {
    // Очищаем сессию в LocalStorage
    localStorage.removeItem('isLoggedIn');

    // Затираем данные пользователя
    this._token = '';
    this._expireAt = 0;
    this._email = '';
  };

  /**
   * Метод проверки авторизованы ли мы в системе
   *
   * @returns {boolean} - возвращает результат проверки
   */
  public isAuthenticated = () => {
    // Загружаем данные из LocalStorage
    let local = localStorage.getItem('isLoggedIn');

    // Если они существуют, то устанавливаем их нашему объекту
    if (local) {
      let data: Data = JSON.parse(local);
      this._token = data._token;
      this._expireAt = Number( data._expireAt );
      this._email = data._email;
    }

    // Проверяем больше ли текущая дата, чем дата окончания сессии
    // и возвращаем результат
    return new Date().getTime() < this._expireAt;
  };

  /**
   * @returns {string} - возвращает текущий емайл пользователя
   */
  public email = () => {
    return this._email;
  };
}

interface Data {
  _token: string,
  _expireAt: number,
  _email: string
}

interface LoginData {
  email: string,
  password: string
}

interface Callback {
  (response: string): void
}
