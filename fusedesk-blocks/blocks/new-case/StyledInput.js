import React from 'react';

export default class StyledInput extends React.Component {
  constructor(props){
    super(props);
    this.inputRef = React.createRef();

  }
    componentDidMount() {
      // this.inputRef.setAttribute('style', this.props.attstyle);
    }
  
    componentDidUpdate() {
      this.inputRef.setAttribute('disabled', true)
      // this.inputRef.setAttribute('style', this.props.attstyle);
    }
  
    render() {
      return (
        <input ref={this.inputRef} {...this.props} />
      );
    }
  }
  