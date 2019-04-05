import React from 'react';
import './main.css';

class Pile extends React.Component {
  render() {
    if (this.props.card) {
      return <div className="card">{this.props.card.unicode}</div>;
    }
    return <div className="card" />;
  }
}

export default Pile;
