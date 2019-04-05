import React from 'react';
import './main.css';

class Stack extends React.Component {
  render() {
    return (
      <div className="stack" onClick={this.props.onClick}>
        {'\u{1F0A0}'}
      </div>
    );
  }
}

export default Stack;
