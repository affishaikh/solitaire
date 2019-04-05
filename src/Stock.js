import React from 'react';
import Waste from './Waste';
import Pile from './Pile';
import './main.css';

class Stock extends React.Component {
  render() {
    return (
        <div className="stock-side">
        <Waste
          unicode={this.props.unicode}
          stackLength={this.props.stackLength}
          onClick={this.props.onStackClick}
        />
        <Pile card={this.props.card} />
      </div>
    );
  }
}

export default Stock;
