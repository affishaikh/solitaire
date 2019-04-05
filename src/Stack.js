import React from 'react';
import './main.css';

class Stack extends React.Component {
  render() {
    return (
      <div className="card" onClick={this.props.onClick}>
        {this.props.unicode}
      </div>
    );
  }
}

export default Stack;
