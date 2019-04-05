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

  getUnicodeCard(drawnCard) {
    return cards.find(unicodeCard => {
      return (
        unicodeCard.type === drawnCard.type &&
        unicodeCard.number === drawnCard.number
      );
    });
  }

  updatePile(drawnCard) {
    const drawnUnicodeCard = this.getUnicodeCard(drawnCard);
    this.setState(state => {
      const pile = _.cloneDeep(state.pile);
      pile.unshift(drawnUnicodeCard);
      return { pile };
    });
  }

  drawCard() {
    const { game } = this.state;
    const drawnCard = game.drawCard();
    this.updatePile(drawnCard);
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
