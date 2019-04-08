import React from 'react';
import cards from './data/cards';
import Card from './CardView';
import './main.css';
import _ from 'lodash';

const getCard = function(unicode) {
  return cards.find(card => {
    return card.unicode === unicode;
  });
};

class Foundation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }

  allowDrop = event => {
    event.preventDefault();
  };

  drop = event => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const card = getCard(data);
    this.setState(state => {
      state.cards.push(card);
      return { state };
    });
    this.props.removeFromPile();
  };

  render() {
    if (this.state.cards.length === 0) {
      return (
        <div
          onDragOver={this.allowDrop}
          onDrop={this.drop}
          className="foundation"
        />
      );
    }

    const card = _.last(this.state.cards);
    return (
      <div
        onDragOver={this.allowDrop}
        onDrop={this.drop}
        className="foundation"
      >
        <Card unicode={card.unicode} />
      </div>
    );
  }
}

export default Foundation;
