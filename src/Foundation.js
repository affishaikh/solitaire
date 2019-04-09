import React from 'react';
import cards from './data/cards';
import Card from './Card';
import './main.css';
import _ from 'lodash';

const getCard = function(unicode) {
  return cards.find(card => {
    return card.unicode === unicode;
  });
};

class Foundation extends React.Component {
  allowDrop = event => {
    event.preventDefault();
  };

  drop = event => {
    event.preventDefault();
    const id = event.dataTransfer.getData('id');
    const card = getCard(id);
    const sourceId = event.dataTransfer.getData('sourceId');

    const foundationIndex = +this.props.id.split('-')[1];
    this.props.addToFoundation(foundationIndex, card);

    if (sourceId.startsWith('foundation')) {
      const sourceFoundationIndex = +sourceId.split('-')[1];
      return this.props.removeFromFoundation(sourceFoundationIndex);
    }
    this.props.removeFromPile();
  };

  render() {
    const card = _.last(this.props.foundation);
    if (!card) {
      return (
        <div
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
        <Card card={card} />
      </div>
    );
  }
}

export default Foundation;
