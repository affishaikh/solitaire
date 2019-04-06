import React from 'react';
import Card from './Card';
import './main.css';

class Pile extends React.Component {
  render() {
    if (this.props.card) {
      const { unicode } = this.props.card;
      return (
        <div className="card">
          <Card unicode={unicode}/>
        </div>
      );
    }
    return <div className="card" />;
  }
}

export default Pile;
