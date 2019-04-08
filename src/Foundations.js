import React from 'react';
import Foundation from './Foundation';
import './main.css';

class Foundations extends React.Component {
  render() {
    const {foundations} = this.props;
    console.log(foundations);
    return (
      <div className="foundations">
        <Foundation
          id="foundation-0"
          addToFoundation={this.props.addToFoundation}
          removeFromFoundation={this.props.removeFromFoundation}
          removeFromPile={this.props.removeFromPile}
          foundation={foundations[0]}
        />
        <Foundation
          id="foundation-1"
          addToFoundation={this.props.addToFoundation}
          removeFromFoundation={this.props.removeFromFoundation}
          removeFromPile={this.props.removeFromPile}
          foundation={foundations[1]}
        />
        <Foundation
          id="foundation-2"
          addToFoundation={this.props.addToFoundation}
          removeFromFoundation={this.props.removeFromFoundation}
          removeFromPile={this.props.removeFromPile}
          foundation={foundations[2]}
        />
        <Foundation
          id="foundation-3"
          addToFoundation={this.props.addToFoundation}
          removeFromFoundation={this.props.removeFromFoundation}
          removeFromPile={this.props.removeFromPile}
          foundation={foundations[3]}
        />
      </div>
    );
  }
}

export default Foundations;
