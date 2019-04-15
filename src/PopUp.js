import React from 'react';
import './main.css';

class PopUp extends React.Component {
  render() {
    return (
      <div className="pop-up">
        <div>You have won the game</div>
        <a href="/">Play again</a>
      </div>
    );
  }
}

export default PopUp;
