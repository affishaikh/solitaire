import React from 'react';
import './main.css';

class Foundation extends React.Component {
  allowDrop = event => {
    event.preventDefault();
  };

  drop = event => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(data));
  };

  render() {
    return (
      <div
        onDragOver={this.allowDrop}
        onDrop={this.drop}
        className="foundation"
      />
    );
  }
}

export default Foundation;
