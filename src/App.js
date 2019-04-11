import React from 'react';
import Stock from './Stock';
import Foundations from './Foundations';
import Tableaus from './Tableaus';
import cards from './data/cards';
import Card from './models/card';
import _ from 'lodash';

const CARD_BACK_UNICODE = '\u{1F0A0}';
const RELOAD_BUTTON_UNICODE = '\u{21BB}';

const getCard = function(unicode) {
  return cards.find(card => {
    return card.unicode === unicode;
  });
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const deck = this.createDeck();
    const { stack, tableaus } = this.createTableausFromDeck(_.cloneDeep(deck));
    this.dropOnTableau = this.dropOnTableau.bind(this);
    this.dropOnFoundation = this.dropOnFoundation.bind(this);
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

  dropOnFoundation(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('id');
    const sourceId = event.dataTransfer.getData('sourceId');
    const card = getCard(id);
    let foundationIndex = this.getIndex(event.target.id);

    if (!this.isSourceFoundation(event.target.id)) {
      foundationIndex = this.getIndex(event.target.parentNode.id);
    }

    this.addToFoundation(foundationIndex, card);

    if (sourceId.startsWith('tableau')) {
      const sourceTableauIndex = this.getIndex(sourceId);
      return this.removeFromTableau(sourceTableauIndex);
    }

    if (this.isSourceFoundation(sourceId)) {
      const sourceFoundationIndex = this.getIndex(sourceId);
      return this.removeFromFoundation(sourceFoundationIndex);
    }
    this.removeFromPile();
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

  dropOnTableau(event) {
    const sourceId = event.dataTransfer.getData('sourceId');
    const id = event.dataTransfer.getData('id');
    let destinationId = event.target.id;
    if (event.target.parentNode.parentNode.id) {
      destinationId = event.target.parentNode.parentNode.id;
    }

    if (event.target.parentNode.id) {
      destinationId = event.target.parentNode.id;
    }
    const sourceIndex = sourceId.split('-')[1];
    const destinationIndex = destinationId.split('-')[1];

    if (sourceId.startsWith('pile')) {
      this.setState(state => {
        state.tableaus[destinationIndex].push(getCard(id));
        return { state };
      });
      this.removeFromPile();
      return;
    }

    if (sourceId.startsWith('foundation')) {
      this.setState(state => {
        state.tableaus[destinationIndex].push(getCard(id));
        return { state };
      });
      this.removeFromFoundation(sourceIndex);
      return;
    }

    this.setState(state => {
      state.tableaus[sourceIndex].pop();
      state.tableaus[destinationIndex].push(getCard(id));
      return { state };
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
            addToFoundation={this.addToFoundation.bind(this)}
            removeFromFoundation={this.removeFromFoundation.bind(this)}
            removeFromPile={this.removeFromPile.bind(this)}
            foundations={this.state.foundations}
          />
        </div>
        <Tableaus onDrop={this.dropOnTableau} tableaus={this.state.tableaus} />
      </main>
    );
  }
}

export default App;
