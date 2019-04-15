import React from 'react';
import Stock from './Stock';
import Foundations from './Foundations';
import Tableaus from './Tableaus';
import cards from './data/cards';
import Card from './models/card';
import ld from 'lodash';

const CARD_BACK_UNICODE = '\u{1F0A0}';
const RELOAD_BUTTON_UNICODE = '\u{21BB}';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const deck = this.createDeck();
    const { stack, tableaus } = this.createTableausFromDeck(ld.cloneDeep(deck));
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

  isSwappingRequired(tableau) {
    return tableau.faceUpCards.length === 0 && tableau.faceDownCards.length > 0;
  }

  removeFromTableau(index, cards) {
    this.setState(state => {
      const tableaus = ld.cloneDeep(state.tableaus);
      const tableau = tableaus[index];
      const numberOfCards = cards.length;
      tableau.faceUpCards.splice(-numberOfCards);

      if (this.isSwappingRequired(tableau)) {
        const card = ld.last(tableau.faceDownCards);
        tableau.faceDownCards.pop();
        tableau.faceUpCards.push(card);
      }
      return { tableaus };
    });
  }

  addToTableau(index, cards) {
    this.setState(state => {
      const tableaus = ld.cloneDeep(state.tableaus);
      const tableau = tableaus[index];
      tableau.faceUpCards = tableau.faceUpCards.concat(cards);
      return { tableaus };
    });
  }

  createDeck() {
    const stack = cards.map(card => {
      return new Card(card.type, card.number, card.unicode, card.color);
    });
    return ld.shuffle(stack);
  }

  createTableausFromDeck(deck) {
    const tableaus = [];
    const stack = ld.cloneDeep(deck);
    for (let i = 1; i <= 7; i++) {
      const cards = stack.splice(-i);
      const faceDownCards = cards.slice(0, cards.length - 1);
      const faceUpCards = cards.slice(-1);
      const tableau = { faceDownCards, faceUpCards };
      tableaus.push(tableau);
    }
    return { stack, tableaus };
  }

  removeFromPile() {
    this.setState(state => {
      const pile = ld.cloneDeep(state.pile);
      pile.shift();
      return { pile };
    });
  }

  removeFromFoundation(index) {
    this.setState(state => {
      const foundations = ld.cloneDeep(state.foundations);
      foundations[index].pop();
      return { foundations };
    });
  }

  addToFoundation(index, card) {
    this.setState(state => {
      const foundations = ld.cloneDeep(state.foundations);
      foundations[index].push(card);
      return { foundations };
    });
  }

  addToPile(drawnCard) {
    this.setState(state => {
      const pile = ld.cloneDeep(state.pile);
      pile.unshift(drawnCard);
      return { pile };
    });
  }

  drawCard() {
    const drawnCard = ld.last(this.state.stack);
    this.setState(state => {
      state.stack.pop();
    });
    this.addToPile(drawnCard);
  }

  reloadStack() {
    this.setState(state => {
      const stack = ld.cloneDeep(state.pile);
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
            card={ld.head(this.state.pile)}
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
