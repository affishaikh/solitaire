import React from 'react';
import Card from './Card';
import { getCard, getIndex } from './utils';
import './main.css';
import ld from 'lodash';

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

  areConsecutiveOfSameSuit(topCard, card) {
    return topCard.type === card.type && topCard.number === card.number - 1;
  }

  canPlayedOnFoundation(card) {
    const { foundation } = this.props;
    if (foundation.length === 0) {
      return card.number === 1;
    }

    const topCard = ld.last(this.props.foundation);
    if (this.areConsecutiveOfSameSuit(topCard, card)) {
      return true;
    }
  }

  drop(event) {
    event.preventDefault();
    const cardIds = JSON.parse(event.dataTransfer.getData('cardIds'));
    const sourceId = event.dataTransfer.getData('sourceId');
    const id = cardIds[0];
    const card = getCard(id);

    let foundationIndex = getIndex(this.props.id);

    if (!this.canPlayedOnFoundation(card)) {
      return;
    }

    this.addToFoundation(foundationIndex, card);

    const sourceIndex = getIndex(sourceId);

    if (sourceId.startsWith('tableau')) {
      return this.removeFromTableau(sourceIndex, [card]);
    }

    if (sourceId.startsWith('foundation')) {
      return this.removeFromFoundation(sourceIndex);
    }

    this.removeFromPile();
  }

  render() {
    const card = ld.last(this.props.foundation);
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
