class Foundations {
  constructor() {
    this.foundations = [];
  }

  addFoundation(foundation) {
    this.foundations.push(foundation);
    return this;
  }

  addCardToFoundation(id) {
    const foundation = this.foundations.find(f => {
      return f.getId() === id;
    });

    foundation.addCard();
  }

  removeCard() {
    this.cards.pop();
  }
}

export default Foundations;
