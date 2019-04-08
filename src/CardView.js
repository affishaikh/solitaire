import React from 'react';
import './main.css';

class Card extends React.Component {
  drag = event => {
    event.dataTransfer.setData('id', event.target.id);
    event.dataTransfer.setData('sourceId', event.target.parentNode.id);
  };

  render() {
    const { unicode, color } = this.props.card;
    const className = 'card ' + color;

    return (
      <div
        draggable="true"
        id={unicode}
        onDragStart={this.drag}
        className={className}
      >
        {unicode}
      </div>
    );
  }
}

export default Card;
