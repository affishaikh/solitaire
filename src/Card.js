import React from 'react';
import './main.css';

class Card extends React.Component {
  render() {
    const { unicode, color } = this.props.card;
    if (this.props.drag) {
      this.drag = this.props.drag;
    }

    const className = 'card ' + color + ' ' + this.props.className;

    return (
      <div
        draggable="true"
        id={unicode}
        onDragStart={this.props.drag}
        className={className}
      >
        {unicode}
      </div>
    );
  }
}

export default Card;
