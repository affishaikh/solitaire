import Card from './card';
import cards from '../data/cards';
import _ from 'lodash';
import Foundations from './foundations';
import Foundation from './foundation';

const createStack = function() {
  return cards.map(card => {
    return new Card(card.type, card.number);
  });
};

class Game {
  constructor() {
    this.stack = [];
    this.foundations = new Foundations();
    this.pile = [];
  }

  startGame() {
    this.stack = createStack();
    this.foundations
      .addFoundation(new Foundation(1))
      .addFoundation(new Foundation(2))
      .addFoundation(new Foundation(3))
      .addFoundation(new Foundation(4));
  }

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

  moveCardFromPile() {
    this.pile.pop();
  }

  getStackLength() {
    return this.stack.length;
  }
}

export default Game;
