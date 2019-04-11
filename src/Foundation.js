import React from 'react';
import Card from './Card';
import './main.css';
import _ from 'lodash';

class Foundation extends React.Component {
  allowDrop = event => {
    event.preventDefault();
  };

  drag(event) {
    event.dataTransfer.setData('id', event.target.id);
    event.dataTransfer.setData('sourceId', event.target.parentNode.id);
  }

  render() {
    const card = _.last(this.props.foundation);
    if (!card) {
      return (
        <div
          id={this.props.id}
          onDragOver={this.allowDrop}
          onDrop={this.props.onDrop}
          className="container"
        />
      );
    }

    return (
      <div
        id={this.props.id}
        onDragOver={this.allowDrop}
        onDrop={this.props.onDrop}
        className="container"
      >
        <Card drag={this.drag.bind(this)} card={card} />
      </div>
    );
  }
}

export default Foundation;
