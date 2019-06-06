import axios from 'axios';

export default class Auth {
  private _token: string;
  private _expireAt: number;
  private _email: string;

  constructor () {
    this._token = '';
    this._expireAt = new Date().getTime();
    this._email = '';
  }

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

  private setSession = (authResult: any) => {
    this._token = authResult.token;
    this._expireAt = new Date().getTime() + (1000 * 360);
    this._email = authResult.email;

    let data = {
      _token: this._token,
      _expireAt: this._expireAt,
      _email: this._email
    };

    localStorage.setItem('isLoggedIn', JSON.stringify(data));
  };

  public logout = () => {
    localStorage.removeItem('isLoggedIn');

    this._token = '';
    this._expireAt = 0;
    this._email = '';
  };

  public isAuthenticated = () => {
    let local = localStorage.getItem('isLoggedIn');

    if (local) {
      let data: Data = JSON.parse(local);
      this._token = data._token;
      this._expireAt = Number( data._expireAt );
      this._email = data._email;
    }
    return new Date().getTime() < this._expireAt;
  };

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