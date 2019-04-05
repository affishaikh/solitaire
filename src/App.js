import React from 'react';
import Stack from './Stack';
import Pile from './Pile';
import cards from './data/cards';
import Game from './models/game';
import _ from 'lodash';

const CARD_BACK_UNICODE = '\u{1F0A0}';
const RELOAD_BUTTON_UNICODE = '\u{21BB}';

class App extends React.Component {
  constructor(props) {
    super(props);
    const game = new Game();
    this.state = {
      game,
      pile: game.getPile(),
      stackLength: game.getStackLength()
    };
  }

  getUnicodeCard(drawnCard) {
    console.log(drawnCard);
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
    this.setState({ stackLength: game.getStackLength() });
    this.updatePile(drawnCard);
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
        <Stack
          unicode={unicode}
          stackLength={this.state.stackLength}
          onClick={onStackClick}
        />
        <Pile card={_.head(this.state.pile)} />
      </main>
    );
  }
}

export default App;
