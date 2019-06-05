import * as React from 'react';

export default class FormGroup extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props);
    this.state = {
      errorMsg: ''
    }
  }

  handleChange = (e: any) => {
    let isErrorMsg = this.props.checkInputFunction(e.target.value);
    this.setState({
      errorMsg: isErrorMsg
    });
    this.props.getInputValue(e);
  };

  render () {
    let valid = this.state.errorMsg ? ' is-invalid' : '';
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          type="text"
          className={'form-control' + valid}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.handleChange}
        />
        <small className="form-text text-danger">
          {this.state.errorMsg}
        </small>
      </div>
    );
  }
}

interface Props {
  id: string,
  label: string,
  placeholder: string,
  value: string,
  checkInputFunction: (inputValue: string) => string,
  getInputValue: (event: any) => void
}

interface State {
  errorMsg: string,
}