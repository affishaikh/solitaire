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
      pile: game.getPile(),
      stackLength: game.getStackLength()
    };
  }

  componentDidMount() {
    const { game } = this.state;
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
    this.setState({ stackLength: this.state.stackLength - 1 });
    this.updatePile(drawnCard);
  }

  emptyPile() {
    this.setState({ pile: [] });
  }

  reloadStack() {
    const { game } = this.state;
    game.reloadStack();
    this.setState({ stackLength: this.state.stackLength - 1 });
    this.emptyPile();
  }

  render() {
    const { stackLength } = this.state;
    let onStackClick = this.drawCard.bind(this);
    if (stackLength === 0) {
      onStackClick = this.reloadStack.bind(this);
    }

    return (
      <main>
        <Stack stackLength={this.state.stackLength} onClick={onStackClick} />
        <Pile card={_.head(this.state.pile)} />
      </main>
    );
  }
}

export default App;
