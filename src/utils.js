import cards from './data/cards';

const getCard = function(unicode) {
  return cards.find(card => {
    return card.unicode === unicode;
  });
};

const getIndex = function(id) {
  return +id.split('-')[1];
};

export { getCard, getIndex };
