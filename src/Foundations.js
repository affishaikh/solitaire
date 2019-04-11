import React from 'react';
import Foundation from './Foundation';
import './main.css';

class Foundations extends React.Component {
  createFoundations(id) {
    const { foundations } = this.props;
    return (
      <Foundation
        id={'foundation-' + id}
        key={'foundation-' + id}
        onDrop={this.props.onDrop}
        addToFoundation={this.props.addToFoundation}
        removeFromFoundation={this.props.removeFromFoundation}
        removeFromPile={this.props.removeFromPile}
        removeFromTableau={this.props.removeFromTableau}
        foundation={foundations[id]}
      />
    );
  }

  render() {
    const dummyArray = [0, 1, 2, 3];
    const foundationsList = dummyArray.map(this.createFoundations.bind(this));

    return <div className="foundations">{foundationsList}</div>;
  }
}

export default Foundations;
