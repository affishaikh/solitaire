import React from 'react';
import Stock from './Stock';
import Foundations from './Foundations';
import cards from './data/cards';
import Card from './models/card';
import _ from 'lodash';

const createStack = function() {
  return cards.map(card => {
    return new Card(card.type, card.number, card.unicode, card.color);
  });
};

const CARD_BACK_UNICODE = '\u{1F0A0}';
const RELOAD_BUTTON_UNICODE = '\u{21BB}';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: createStack(),
      pile: [],
      foundations: []
    };
  }

  removeFromPile() {
    this.setState(state => {
      state.pile.shift();
      return { state };
    });
  }

  addToPile(drawnCard) {
    this.setState(state => {
      const pile = _.cloneDeep(state.pile);
      pile.unshift(drawnCard);
      return { pile };
    });
  }

  drawCard() {
    this.setState(state => {
      const drawnCard = _.last(state.stack);
      state.stack.pop();
      this.addToPile(drawnCard);
    });
  }

  reloadStack() {
    this.setState(state => {
      const stack = _.cloneDeep(state.pile);
      const pile = [];
      return { stack, pile };
    });
  }

  getDetailsForStack() {
    let onStackClick = this.drawCard.bind(this);
    let unicode = CARD_BACK_UNICODE;
    const stackLength = this.state.stack.length;

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
          stackLength={this.state.stack.length}
          card={_.head(this.state.pile)}
        />
        <Foundations
          foundation={this.state.foundations}
          removeFromPile={this.removeFromPile.bind(this)}
        />
      </main>
    );
  }
}

export default App;
