import React from 'react';
import Card from './CardView';
import './main.css';

class Pile extends React.Component {
  render() {
    if (this.props.card) {
      return (
        <div className="container" id="pile">
          <Card card={this.props.card} />
        </div>
      );
    }
    return <div className="container" />;
  }
}

export default Pile;
