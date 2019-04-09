import React from 'react';
import Stock from './Stock';
import Foundations from './Foundations';
import Tableaus from './Tableaus';
import cards from './data/cards';
import Card from './models/card';
import _ from 'lodash';

const CARD_BACK_UNICODE = '\u{1F0A0}';
const RELOAD_BUTTON_UNICODE = '\u{21BB}';

class App extends React.Component {
  constructor(props) {
    super(props);
    const stack = this.createStack();
    this.state = {
      stack,
      tableaus: this.createTableaus(stack),
      foundations: [[], [], [], []],
      pile: []
    };
  }

  createStack() {
    const stack = cards.map(card => {
      return new Card(card.type, card.number, card.unicode, card.color);
    });
    return _.shuffle(stack);
  }

  createTableaus(stack) {
    const tableaus = [];
    for (let i = 1; i <= 7; i++) {
      const tableau = stack.splice(-i);
      tableaus.push(tableau);
    }
    return tableaus;
  }

  removeFromPile() {
    this.setState(state => {
      const pile = _.cloneDeep(state.pile);
      pile.shift();
      return { pile };
    });
  }

  removeFromFoundation(index) {
    this.setState(state => {
      const foundations = _.cloneDeep(state.foundations);
      foundations[index].pop();
      return { foundations };
    });
  }

  addToFoundation(index, card) {
    this.setState(state => {
      const foundations = _.cloneDeep(state.foundations);
      foundations[index].push(card);
      return { foundations };
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
    const drawnCard = _.last(this.state.stack);
    this.setState(state => {
      state.stack.pop();
    });
    this.addToPile(drawnCard);
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
        <div className="upper-side">
          <Stock
            onStackClick={onStackClick}
            unicode={unicode}
            stackLength={this.state.stack.length}
            card={_.head(this.state.pile)}
          />
          <Foundations
            foundation={this.state.foundations}
            addToFoundation={this.addToFoundation.bind(this)}
            removeFromFoundation={this.removeFromFoundation.bind(this)}
            removeFromPile={this.removeFromPile.bind(this)}
            foundations={this.state.foundations}
          />
        </div>
        <Tableaus tableaus={this.state.tableaus} />
      </main>
    );
  }
}

export default App;
