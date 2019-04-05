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
    this.stack = createStack();
    this.pile = [];
  }

  // startGame() {
  //   this.stack = ;
  // }

  drawCard() {
    const drawnCard = _.last(this.stack);
    this.stack.pop();
    this.pile.unshift(drawnCard);
    return drawnCard;
  }

  getPile() {
    return _.cloneDeep(this.pile);
  }

  reloadStack() {
    this.stack = _.cloneDeep(this.pile);
  }

  getStackLength() {
    return this.stack.length;
  }
}

export default Game;
