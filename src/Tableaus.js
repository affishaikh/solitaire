import React from 'react';
import Tableau from './Tableau';
import './main.css';

class Tableaus extends React.Component {
  createTableaus(tableaus) {
    return tableaus.map(tableau => {
      return <Tableau cards={tableau} />;
    });
  }

  render() {
    const { tableaus } = this.props;

    return <div className="tableaus">{this.createTableaus(tableaus)}</div>;
  }
}

export default Tableaus;
