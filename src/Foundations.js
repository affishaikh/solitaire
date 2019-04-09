import React from 'react';
import Foundation from './Foundation';
import './main.css';

class Foundations extends React.Component {
  createFoundations = id => {
    const { foundations } = this.props;
    return (
      <Foundation
        id={'foundation-' + id}
        addToFoundation={this.props.addToFoundation}
        removeFromFoundation={this.props.removeFromFoundation}
        removeFromPile={this.props.removeFromPile}
        foundation={foundations[id]}
      />
    );
  };

  render() {
    const dummyArray = [0, 1, 2, 3];
    const foundationsList = dummyArray.map(this.createFoundations.bind(this));

    return <div className="foundations">{foundationsList}</div>;
  }
}

export default Foundations;
