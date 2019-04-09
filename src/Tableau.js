import React from 'react';
import Card from './Card';
import './main.css';

class Tableau extends React.Component {
  createCards(cards) {
    return cards.map(card => {
      return (
        <div className="tableau-card-container">
          <Card key={card.unicode} card={card} />
        </div>
      );
    });
  }

  render() {
    const { cards } = this.props;
    return <div className="tableau">{this.createCards(cards)}</div>;
  }
}

export default Tableau;
