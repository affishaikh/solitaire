import React from 'react';
import Card from './Card';
import ld from 'lodash';
import { getCard, getIndex } from './utils';
import './main.css';

const FACE_DOWN_CARD_UNICODE = '\u{1F0A0}';

class Tableau extends React.Component {
  constructor(props) {
    super(props);
    this.drop = this.drop.bind(this);
    this.addToTableau = this.props.addToTableau;
    this.removeFromPile = this.props.removeFromPile;
    this.removeFromFoundation = this.props.removeFromFoundation;
    this.removeFromTableau = this.props.removeFromTableau;
  }

  createFaceDownCards(faceDownCards) {
    const card = { unicode: FACE_DOWN_CARD_UNICODE, color: 'purple' };
    return faceDownCards.map(() => {
      return (
        <div className="tableau-card-container">
          <Card card={card} />
        </div>
      );
    });
  }

  createFaceUpCard(faceUpCards) {
    return faceUpCards.map(card => {
      return (
        <div className="tableau-card-container">
          <Card drag={this.drag.bind(this)} card={card} />
        </div>
      );
    });
  }

  createCards(tableau) {
    const faceDownCards = this.createFaceDownCards(tableau.faceDownCards);
    const faceUpCards = this.createFaceUpCard(tableau.faceUpCards);
    return { faceDownCards, faceUpCards };
  }

  drag(event) {
    event.dataTransfer.setData('id', event.target.id);
    event.dataTransfer.setData(
      'sourceId',
      event.target.parentNode.parentNode.id
    );
  }

  allowDrop = event => {
    event.preventDefault();
  };

  getIndex(id) {
    return +id.split('-')[1];
  }

  isAlternateDescendant(topCardOfTableau, card) {
    return (
      topCardOfTableau.color !== card.color &&
      topCardOfTableau.number === card.number + 1
    );
  }

  canPlayedOnTableau(card) {
    const cards = this.props.tableau.faceUpCards;
    const topCardOfTableau = ld.last(cards);

    if (cards.length === 0) {
      return false;
    }

    if (this.isAlternateDescendant(topCardOfTableau, card)) {
      return true;
    }
    return false;
  }

  drop(event) {
    const sourceId = event.dataTransfer.getData('sourceId');
    const cardId = event.dataTransfer.getData('id');

    const sourceIndex = getIndex(sourceId);
    const tableauIndex = getIndex(this.props.id);
    const card = getCard(cardId);

    if (!this.canPlayedOnTableau(card)) {
      return false;
    }

    this.addToTableau(tableauIndex, card);

    if (sourceId.startsWith('pile')) {
      return this.removeFromPile();
    }

    if (sourceId.startsWith('foundation')) {
      return this.removeFromFoundation(sourceIndex);
    }

    this.removeFromTableau(sourceIndex);
  }

  render() {
    const { tableau } = this.props;

    if (
      tableau.faceDownCards.length === 0 &&
      tableau.faceUpCards.length === 0
    ) {
      return (
        <div
          onDragOver={this.allowDrop}
          onDrop={this.drop}
          id={this.props.id}
          className="tableau"
        >
          <div className="tableau-card-container" />
        </div>
      );
    }

    const { faceDownCards, faceUpCards } = this.createCards(tableau);
    return (
      <div
        onDragOver={this.allowDrop}
        onDrop={this.drop}
        className="tableau"
        id={this.props.id}
      >
        {faceDownCards} {faceUpCards}
      </div>
    );
  }
}

export default Tableau;
