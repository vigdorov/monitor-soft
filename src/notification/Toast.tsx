// Подключаем React
import * as React from 'react';

// Подключаем jQuery
import jQuery from "jquery";

// Подключаем логотив уведомлений
import logo from '../img/logo-toast.png';


export default class Toast extends React.Component<Props, State> {
  /**
   * Показываем уведомление, сразу как только компонент был создан
   */
  componentDidMount () {
    jQuery('.toast').toast({delay: 5000}).toast('show');
  }

  /**
   * Метод рендера компонента
   */
  render () {
    return (
      <div className="toast"
           role="alert"
           aria-live="assertive"
           aria-atomic="true"
           style={ {backgroundColor: 'white'} }
      >
        <div className="toast-header">
          <img src={logo} className="rounded mr-2" alt="logo" />
          <strong className="mr-auto">Монитор софт</strong>
          <small className="text-muted">сейчас</small>
          <button type="button" className="ml-2 mb-1 close"
                  data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">
          {this.props.body}
        </div>
      </div>
    );
  }
}

interface Props {
  body: string
}

interface State {

}