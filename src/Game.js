import React from 'react';
import Stock from './Stock';
import Foundations from './Foundations';
import Tableaus from './Tableaus';
import cards from './data/cards';
import Card from './models/card';
import _ from 'lodash';

const CARD_BACK_UNICODE = '\u{1F0A0}';
const RELOAD_BUTTON_UNICODE = '\u{21BB}';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const deck = this.createDeck();
    const { stack, tableaus } = this.createTableausFromDeck(_.cloneDeep(deck));
    this.addToFoundation = this.addToFoundation.bind(this);
    this.addToTableau = this.addToTableau.bind(this);
    this.removeFromPile = this.removeFromPile.bind(this);
    this.removeFromFoundation = this.removeFromFoundation.bind(this);
    this.removeFromTableau = this.removeFromTableau.bind(this);
    this.state = {
      tableaus,
      stack,
      foundations: [[], [], [], []],
      pile: []
    };
  }

  getIndex(id) {
    return id.split('-')[1];
  }

  isSourceFoundation(sourceId) {
    return sourceId.startsWith('foundation');
  }

  removeFromTableau(index) {
    this.setState(state => {
      const tableaus = _.cloneDeep(state.tableaus);
      tableaus[index].pop();
      return { tableaus };
    });
  }

  addToTableau(index, card) {
    this.setState(state => {
      const tableaus = _.cloneDeep(state.tableaus);
      tableaus[index].push(card);
      return { tableaus };
    });
  }

  createDeck() {
    const stack = cards.map(card => {
      return new Card(card.type, card.number, card.unicode, card.color);
    });
    return _.shuffle(stack);
  }

  createTableausFromDeck(deck) {
    const tableaus = [];
    const stack = _.cloneDeep(deck);
    for (let i = 1; i <= 7; i++) {
      const tableau = stack.splice(-i);
      tableaus.push(tableau);
    }
    return { stack, tableaus };
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
            onDrop={this.dropOnFoundation}
            addToFoundation={this.addToFoundation}
            removeFromFoundation={this.removeFromFoundation}
            removeFromPile={this.removeFromPile}
            removeFromTableau={this.removeFromTableau}
            foundations={this.state.foundations}
          />
        </div>
        <Tableaus
          addToTableau={this.addToTableau}
          removeFromFoundation={this.removeFromFoundation}
          removeFromPile={this.removeFromPile}
          removeFromTableau={this.removeFromTableau}
          onDrop={this.dropOnTableau}
          tableaus={this.state.tableaus}
        />
      </main>
    );
  }
}

export default Game;
