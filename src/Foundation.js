import React from 'react';
import Card from './Card';
import { getCard, getIndex } from './utils';
import './main.css';
import _ from 'lodash';

class Foundation extends React.Component {
  constructor(props) {
    super(props);
    this.drop = this.drop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.addToFoundation = this.props.addToFoundation;
    this.removeFromFoundation = this.props.removeFromFoundation;
    this.removeFromPile = this.props.removeFromPile;
    this.removeFromTableau = this.props.removeFromTableau;
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drag(event) {
    event.dataTransfer.setData('id', event.target.id);
    event.dataTransfer.setData('sourceId', event.target.parentNode.id);
  }

  getIndex(id) {
    return +id.split('-')[1];
  }

  drop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('id');
    const sourceId = event.dataTransfer.getData('sourceId');
    const card = getCard(cardId);

    let foundationIndex = getIndex(this.props.id);
    this.addToFoundation(foundationIndex, card);

    const sourceIndex = getIndex(sourceId);
    if (sourceId.startsWith('tableau')) {
      return this.removeFromTableau(sourceIndex);
    }

    if (sourceId.startsWith('foundation')) {
      return this.removeFromFoundation(sourceIndex);
    }

    this.removeFromPile();
  }

  render() {
    const card = _.last(this.props.foundation);
    if (!card) {
      return (
        <div
          id={this.props.id}
          onDragOver={this.allowDrop}
          onDrop={this.drop}
          className="container"
        />
      );
    }

    return (
      <div
        id={this.props.id}
        onDragOver={this.allowDrop}
        onDrop={this.drop}
        className="container"
      >
        <Card drag={this.drag.bind(this)} card={card} />
      </div>
    );
  }
}

export default Foundation;
