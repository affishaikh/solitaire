import React from 'react';
import './main.css';

class Waste extends React.Component {
  render() {
    return (
      <div className="card" onClick={this.props.onClick}>
        {this.props.unicode}
      </div>
    );
  }
}

export default Waste;
