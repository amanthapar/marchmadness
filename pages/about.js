import React, { Component } from 'react';
import Layout from '../components/Layout';
export default class About extends Component {
  render() {
    return (
      <Layout>
        <div>Please read:</div>

        <h1>March Madness </h1>
        <h3>
          <p>
            This is an application running on the Ethereum platform. The
            Ethereum smart contract allows entrants to pay an entry fee.
          </p>
          <p>Winner takes all!</p>
          <p>You can host your own contests, for any game or sport.</p>

          <p>
            Metamask is the preffered wallet provider. You can use your own if
            you wish.
          </p>
          <p>
            Note: there is no authentication for this website, welcome to the
            (read: future) decentralized web!
          </p>
        </h3>
      </Layout>
    );
  }
}
