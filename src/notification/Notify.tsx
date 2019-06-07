// Подключаем React
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Подключаем компонент создания тела уведомления
import Toast from './Toast';


export default class Notify {
  /**
   *
   * @type {Notify} _instance - экземпляр класса
   */
  private static _instance: Notify = new Notify();

  private readonly _messages: {
    [id: number]: string
  };
  private _id: number;

  private constructor () {
    /**
     * @type {{}} _messages - объект в котором храняться активные уведомления
     * @private
     */
    this._messages = {};
    /**
     *
     * @type {number} _id - счетчик текущего идентификатора уведомления
     * @private
     */
    this._id = 0;
  }

  /**
   * Метод показывает уведомление на странице
   *
   * @param {string} body - текст сообщения
   */
  public showMessage (body: string) {
    let id = this._id++;

    this._messages[id] = body;
    this._render();
    // Запускаем таймер, чтобы удалить уведомление из памяти
    setTimeout( () => {
      delete this._messages[id];
    }, 5000);
  }

  /**
   * Метод рендера уведомлений
   *
   * @private
   */
  private _render () {
    ReactDOM.render(
      <Notification messages={this._messages}/>,
      document.getElementById('notify')
    );
  }

  /**
   * Метод получения ссылки на экземпляр объекта Notify
   * @returns {Notify}
   */
  public static getInstance () {
    return Notify._instance;
  }
}

class Notification extends React.Component<Props, State> {
  /**
   * Объект React, который отвечает за визуальное отображение уведомлений
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false
    }
  }

  /**
   * Метод визуальной отрисовки уведомлений
   *
   */
  render () {
    let messages = this.props.messages,
        toasts: any[] = [];

    for (let key in messages) {
      let msg = messages[key];
      toasts.push(
        <Toast body={msg} key={key}/>
      );
    }

    return (
      <React.Fragment>
        <div aria-live="polite" aria-atomic="true"
             style={ {
               position: 'fixed',
               bottom: '20px',
               right: '20px',
               zIndex: 1000,
             } }>

          <div style={ {position: 'absolute', bottom: '0', right: '0', minWidth: '250px'} }>
            { toasts }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

interface Props {
  messages: {
    [id: number]: string
  }
}

interface State {
  show: boolean
}