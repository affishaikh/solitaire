import React from 'react';
import './main.css';

class Card extends React.Component {
  drag = event => {
    event.dataTransfer.setData('text', event.target.id);
  };

  render() {
    const { unicode } = this.props;
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
}

export default Card;
