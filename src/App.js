import React from 'react';
import Stock from './Stock';
import Foundations from './Foundations';
import cards from './data/cards';
import Game from './models/game';
import _ from 'lodash';

const CARD_BACK_UNICODE = '\u{1F0A0}';
const RELOAD_BUTTON_UNICODE = '\u{21BB}';

class App extends React.Component {
  constructor(props) {
    super(props);
    const game = new Game();
    game.startGame();
    this.state = {
      game,
      pile: [],
      stackLength: game.getStackLength()
    };
  }

  getUnicodeCard(drawnCard) {
    return cards.find(unicodeCard => {
      return (
        unicodeCard.type === drawnCard.type &&
        unicodeCard.number === drawnCard.number
      );
    });
  }

  addToPile(drawnCard) {
    const drawnUnicodeCard = this.getUnicodeCard(drawnCard);
    this.setState(state => {
      const pile = _.cloneDeep(state.pile);
      pile.unshift(drawnUnicodeCard);
      return { pile };
    });
  }

  removeFromPile() {
    this.setState(state => {
      state.pile.shift();
      return { state };
    });
  }

  drawCard() {
    const { game } = this.state;
    const drawnCard = game.drawCard();
    this.setState({ stackLength: game.getStackLength() });
    this.addToPile(drawnCard);
  }

  emptyPile() {
    this.setState({ pile: [] });
  }

  reloadStack() {
    const { game } = this.state;
    game.reloadStack();
    this.setState({ stackLength: game.getStackLength() });
    this.emptyPile();
  }

  moveCardFromPile() {
    const { game } = this.state;
    game.moveCardFromPile();
    this.removeFromPile();
  }

  getDetailsForStack() {
    const { stackLength } = this.state;
    let onStackClick = this.drawCard.bind(this);
    let unicode = CARD_BACK_UNICODE;
    if (stackLength === 0) {
      onStackClick = this.reloadStack.bind(this);
      unicode = RELOAD_BUTTON_UNICODE;
    }

    return { onStackClick, unicode };
  }

  render() {
    const { onStackClick, unicode } = this.getDetailsForStack();

    return (
      <main>
        <Stock
          onStackClick={onStackClick}
          unicode={unicode}
          stackLength={this.state.stackLength}
          card={_.head(this.state.pile)}
        />
        <Foundations removeFromPile={this.removeFromPile.bind(this)} />
      </main>
    );
  }
}

export default App;
