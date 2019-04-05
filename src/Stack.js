import React from 'react';
import './main.css';

class Stack extends React.Component {
  render() {
    if (this.props.stackLength === 0) {
      return (
        <div className="card" onClick={this.props.onClick}>
          {'\u{21BB}'}
        </div>
      );
    }
    return (
      <div className="card" onClick={this.props.onClick}>
        {'\u{1F0A0}'}
      </div>
    );
  }
}

export default Stack;
