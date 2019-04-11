import React from 'react';
import Card from './Card';
import './main.css';

class Pile extends React.Component {
  drag(event) {
    event.dataTransfer.setData('id', event.target.id);
    event.dataTransfer.setData('sourceId', event.target.parentNode.id);
  }

  render() {
    if (this.props.card) {
      return (
        <div className="container" id="pile">
          <Card drag={this.drag.bind(this)} card={this.props.card} />
        </div>
      );
    }
    return <div className="container" />;
  }
}

export default Pile;
