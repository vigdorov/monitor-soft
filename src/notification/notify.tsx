import * as React from 'react';
import Toast from './Toast';

export default class Notification extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      show: false
    }
  }

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
             style={ {position: 'fixed', bottom: '20px', right: '20px'} }>

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