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
      return <Card card={card} className={'tableau-card'} />;
    });
  }

  createFaceUpCard(faceUpCards) {
    return faceUpCards.map(card => {
      return (
        <Card
          className={'tableau-card'}
          drag={this.drag.bind(this)}
          card={card}
        />
      );
    });
  }

  createCards(tableau) {
    const faceDownCards = this.createFaceDownCards(tableau.faceDownCards);
    const faceUpCards = this.createFaceUpCard(tableau.faceUpCards);
    return { faceDownCards, faceUpCards };
  }

  drag(event) {
    const draggedCardId = event.target.id;
    const { faceUpCards } = this.props.tableau;
    const index = faceUpCards.findIndex(card => {
      return card.unicode === draggedCardId;
    });
    const requiredCards = faceUpCards.slice(index);
    const cardIds = requiredCards.map(card => {
      return card.unicode;
    });
    event.dataTransfer.setData('cardIds', JSON.stringify(cardIds));
    event.dataTransfer.setData('sourceId', event.target.parentNode.id);
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

  isTableauEmpty() {
    const { faceUpCards, faceDownCards } = this.props.tableau;
    return faceUpCards.length === 0 && faceDownCards.length === 0;
  }

  canPlayedOnTableau(card) {
    const faceUpCards = this.props.tableau.faceUpCards;
    const topCardOfTableau = ld.last(faceUpCards);

    if (this.isTableauEmpty()) {
      return card.number === 13;
    }

    if (this.isAlternateDescendant(topCardOfTableau, card)) {
      return true;
    }
    return false;
  }

  getCards(cardIds) {
    return cardIds.map(cardId => {
      return getCard(cardId);
    });
  }

  drop(event) {
    const sourceId = event.dataTransfer.getData('sourceId');
    const cardIds = JSON.parse(event.dataTransfer.getData('cardIds'));
    const sourceIndex = getIndex(sourceId);
    const tableauIndex = getIndex(this.props.id);
    const cards = this.getCards(cardIds);

    if (!this.canPlayedOnTableau(ld.first(cards))) {
      return;
    }

    this.addToTableau(tableauIndex, cards);

    if (sourceId.startsWith('pile')) {
      return this.removeFromPile();
    }

    if (sourceId.startsWith('foundation')) {
      return this.removeFromFoundation(sourceIndex);
    }

    this.removeFromTableau(sourceIndex, cards);
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
