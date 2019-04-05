import React from 'react';
import Stack from './Stack';
import Pile from './Pile';
import cards from './data/cards';
import Game from './models/game';
import _ from 'lodash';
import './main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    const game = new Game();
    this.state = {
      game,
      pile: game.getPile()
    };
  }

  componentDidMount() {
    const { game } = this.state;
    game.startGame();
  }

  drawCard() {
    const { game } = this.state;
    game.drawCard();
    this.setState(() => {
      const pile = game.getPile();
      const pile1 = pile.map(card => {
        return cards.find(card1 => {
          return card1.type == card.type && card1.number == card.number;
        });
      });
      return { pile: pile1 };
    });
  }

  render() {
    return (
      <main>
        <Stack onClick={this.drawCard.bind(this)} />
        <Pile card={_.head(this.state.pile)} />
      </main>
    );
  }
}

export default App;
