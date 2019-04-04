import React from 'react';
import Stack from './Stack';
import Game from './models/game';
import './main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new Game()
    };
  }

  componentDidMount() {
    const { game } = this.state;
    game.startGame();
  }

  render() {
    return <Stack />;
  }
}

export default App;
