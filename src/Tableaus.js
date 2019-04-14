import React from 'react';
import Tableau from './Tableau';
import './main.css';

class Tableaus extends React.Component {
  createTableaus(tableaus) {
    let index = 0;
    return tableaus.map(tableau => {
      const uniqueId = 'tableau-' + index++;
      return (
        <Tableau
          addToTableau={this.props.addToTableau}
          removeFromFoundation={this.props.removeFromFoundation}
          removeFromPile={this.props.removeFromPile}
          removeFromTableau={this.props.removeFromTableau}
          onDrop={this.props.onDrop}
          id={uniqueId}
          key={uniqueId}
          tableau={tableau}
        />
      );
    });
  }

  render() {
    const { tableaus } = this.props;

    return <div className="tableaus">{this.createTableaus(tableaus)}</div>;
  }
}

export default Tableaus;
