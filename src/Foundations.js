import React from 'react';
import Foundation from './Foundation';
import './main.css';

class Foundations extends React.Component {
  render() {
    return (
      <div className="foundations">
        <Foundation removeFromPile={this.props.removeFromPile} />
        <Foundation removeFromPile={this.props.removeFromPile} />
        <Foundation removeFromPile={this.props.removeFromPile} />
        <Foundation removeFromPile={this.props.removeFromPile} />
      </div>
    );
  }
}

export default Foundations;
