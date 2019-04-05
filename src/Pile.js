import React from 'react';
import './main.css';

class Pile extends React.Component {
  drag = event => {
    event.dataTransfer.setData('text', event.target.id);
  };

  render() {
    if (this.props.card) {
      const { unicode } = this.props.card;
      return (
        <div
          draggable="true"
          id={unicode}
          onDragStart={this.drag}
          className="card"
        >
          {unicode}
        </div>
      );
    }
    return <div className="card" />;
  }
}

export default Pile;
