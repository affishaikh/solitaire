import React from 'react';
import Card from './Card';
import './main.css';

class Tableau extends React.Component {
  createCards(cards) {
    return cards.map(card => {
      return <Card key={card.unicode} card={card} />;
    });
  }

  render() {
    const { cards } = this.props;
    return <div className="tableau">{this.createCards(cards)}</div>;
  }
}

export default Tableau;
