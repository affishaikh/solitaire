import Card from './card';
import cards from '../data/cards';

const createStack = function() {
  return cards.map(card => {
    return new Card(card.type, card.number);
  });
};

class Game {
  constructor() {
    this.stack = [];
  }

  startGame() {
    this.stack = createStack();
  }
}

export default Game;
