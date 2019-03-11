import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import MarchMadness from '../../../ethereum/marchmadness';
import PlayerRow from '../../../components/PlayerRow';
import web3 from '../../../ethereum/web3';
import { Link } from '../../../routes';
export default class PlayerList extends Component {
  state = {
    message: '',
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    const contest = MarchMadness(address);
    const playerArray = await contest.methods.getPlayers().call();
    const playerCount = playerArray.length;

    const players = await Promise.all(
      Array(parseInt(playerCount))
        .fill()
        .map((element, index) => {
          return contest.methods.players(index).call();
        })
    );

    const names = await Promise.all(
      Array(parseInt(playerCount))
        .fill()
        .map((element, index) => {
          return contest.methods.names(index).call();
        })
    );
    const teams = await Promise.all(
      Array(parseInt(playerCount))
        .fill()
        .map((element, index) => {
          return contest.methods.teams(index).call();
        })
    );
    console.log(address, players, names, teams, playerCount);
    return { address, players, names, teams, playerCount };
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success' });
    await MarchMadness.methods.pickWinner().send({ from: accounts[0] });
    this.setState({ message: 'A winner has been picked!' });
  };

  renderRow() {
    return this.props.players.map((player, index) => {
      return (
        <PlayerRow
          key={index}
          id={index}
          player={player}
          names={this.props.names}
          team={this.props.teams}
          address={this.props.address}
        />
      );
    });
  }
  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Player List</h3>
        <Link route={`/contests/${this.props.address}`}>
          <a>Back</a>
        </Link>
        <Button
          onClick={this.onClick}
          primary
          floated="right"
          style={{ marginBottom: 10 }}
        >
          Select Random Winner
        </Button>

        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Team</HeaderCell>
              <HeaderCell>Player</HeaderCell>
              <HeaderCell>Make Winner</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <div>Found {this.props.playerCount} players.</div>
        <div> {this.state.message} </div>
      </Layout>
    );
  }
}
