import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

export default class MarchMadnessIndex extends Component {
  static async getInitialProps() {
    const contests = await factory.methods.getDeployedMarchMadness().call();
    console.log(contests);
    return { contests };
  }

  renderContests() {
    const items = this.props.contests.map(address => ({
      header: address,
      description: (
        <Link route={`/campaigns/${address}`}>
          <a>View Contest Details</a>
        </Link>
      ),
      fluid: false,
      image: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
    }));
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          March Madness Home Page
          <div>
            <h3>Open Contests</h3>

            <Link route="/contests/new">
              <a>
                <Button
                  floated="right"
                  content="Create Contest"
                  icon="add"
                  primary
                />
              </a>
            </Link>
            {this.renderContests()}
          </div>
        </div>
      </Layout>
    );
  }
}
