import React from 'react';
import './main.css';

class Stack extends React.Component {
  drag = event => {
    event.dataTransfer.setData('text', event.target.id);
  };

  render() {
    return (
      <div className="container blue" onClick={this.props.onClick}>
        {this.props.unicode}
      </div>
    );
  }
}

export default Stack;
