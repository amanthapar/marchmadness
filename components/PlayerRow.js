import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import MarchMadness from '../ethereum/marchmadness';

export default class RequestRow extends Component {
  SelectedWinner = async () => {
    const accounts = await web3.eth.getAccounts();
    const marchmadness = MarchMadness(this.props.address);
    await marchmadness.methods.pickSelectedWinner(this.props.id).send({
      from: accounts[0],
    });
  };
  render() {
    const { id, player, names, teams } = this.props;
    const { Row, Cell } = Table;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{names}</Cell>
        <Cell>{teams}</Cell>
        <Cell>{player}</Cell>
        <Cell>
          {
            <Button color="green" basic onClick={this.SelectedWinner}>
              Make Winner
            </Button>
          }
        </Cell>
      </Row>
    );
  }
}
