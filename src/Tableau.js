import React from 'react';
import Card from './Card';
import './main.css';

const FACE_DOWN_CARD_UNICODE = '\u{1F0A0}';

class Tableau extends React.Component {
  createFaceDownCards(numberOfCards) {
    const dummyArray = new Array(numberOfCards).fill(0);
    const card = { unicode: FACE_DOWN_CARD_UNICODE, color: 'purple' };
    return dummyArray.map(() => {
      return (
        <div className="tableau-card-container">
          <Card card={card} />
        </div>
      );
    });
  }

  createFaceUpCard(card) {
    return (
      <div className="tableau-card-container">
        <Card drag={this.drag.bind(this)} card={card} />
      </div>
    );
  }

  createCards(cards) {
    const faceDownCards = this.createFaceDownCards(cards.length - 1);
    const faceUpCard = this.createFaceUpCard(cards.slice(-1)[0]);
    return { faceDownCards, faceUpCard };
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

  render() {
    const { cards } = this.props;

    if (cards.length === 0) {
      return (
        <div
          onDragOver={this.allowDrop}
          onDrop={this.props.onDrop}
          id={this.props.id}
          className="tableau"
        />
      );
    }

    const { faceDownCards, faceUpCard } = this.createCards(cards);
    return (
      <div
        onDragOver={this.allowDrop}
        onDrop={this.props.onDrop}
        className="tableau"
        id={this.props.id}
      >
        {faceDownCards} {faceUpCard}
      </div>
    );
  }
}

export default Tableau;
