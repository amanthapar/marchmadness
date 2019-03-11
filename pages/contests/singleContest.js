import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import fetchContest from '../../ethereum/marchmadness';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

export default class SingleContest extends Component {
  static async getInitialProps(props) {
    const contest = fetchContest(props.query.address);

    const summary = await contest.methods.MarchMadnessdata(0).call();
    const manager = await contest.methods.manager().call();
    const players = await contest.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(props.query.address);

    return {
      address: props.query.address,
      balance,
      players,
      manager,
      managerName: summary[0],
      description: summary[1],
      imageUrl: summary[2],
    };
  }

  renderSingleContest() {
    const { balance, manager, managerName, players, description } = this.props;

    const items = [
      {
        header: managerName,
        meta: 'Manager/Creator of Contest',
        description:
          'Only Manager can pick winner of contest, and end it anytime. (Does not have ability to decide who wins)',
      },
      {
        header: manager,
        meta: 'Address of Manager/Creator',
        description: 'Address of Wallet of manager',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: description,
        meta: 'Description',
        description: 'Information provided by Manager',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Current Size of Winning Pot',
        description: 'How much money is left to win!! (Ether)',
      },
      {
        header: players.length,
        meta: 'Number of contributions/Buy-ins',
        description: 'Number of people who have entered this contest',
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3> Detailed Contest Page</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderSingleContest()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/contests/${this.props.address}/players`}>
                <a>
                  <Button primary>View Current Player list</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
