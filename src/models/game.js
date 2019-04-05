import Card from './card';
import cards from '../data/cards';
import _ from 'lodash';

const createStack = function() {
  return cards.map(card => {
    return new Card(card.type, card.number);
  });
};

class Game {
  constructor() {
    this.stack = [];
    this.pile = [];
  }

  startGame() {
    this.stack = createStack();
  }

  drawCard() {
    const drawnCard = _.last(this.stack);
    this.stack.pop();
    this.pile.unshift(drawnCard);
  }

  getPile() {
    return _.cloneDeep(this.pile);
  }
}

export default Game;
