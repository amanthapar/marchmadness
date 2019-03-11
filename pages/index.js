import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

export default class MarchMadnessIndex extends Component {
  static async getInitialProps() {
    const contests = await factory.methods.getDeployedMarchMadness().call();
    return { contests };
  }

  renderContests() {
    const items = this.props.contests.map(address => ({
      header: address,
      meta: 'Created by Aman',
      extra: 'Open',
      description: (
        <Link route={`/contests/${address}`}>
          <a>View Contest Details</a>
        </Link>
      ),
      style: { overflowWrap: 'break-word' },
      fluid: false,
      image:
        'https://www.ncaa.com/sites/default/files/public/styles/original/public-s3/tile-images/event/19_MBB_FinalFour_FC_RGB.png?itok=IulihWXF',
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
