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
  // constructor(props) {
  //   super(props);
  //   this.state = { cards: [] };
  // }

  allowDrop = event => {
    event.preventDefault();
  };

  drop = event => {
    event.preventDefault();
    const data = event.dataTransfer.getData('id');
    const card = getCard(data);
    const sourceId = event.dataTransfer.getData('sourceId');
    this.props.addToFoundation(this.props.id.split('-')[1], card);

    if (sourceId.startsWith('foundation')) {
      const foundationNumber = +sourceId.split('-')[1];
      this.props.removeFromFoundation(foundationNumber);
    } else {
      this.props.removeFromPile();
    }
  };

  render() {
    const card = _.last(this.props.foundation);
    console.log(card);
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
