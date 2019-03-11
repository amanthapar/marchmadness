import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

export default class CreateContest extends Component {
  state = {
    description: 'National Semifinal Game 1',
    imageUrl:
      'https://www.ncaa.com/sites/default/files/public/styles/original/public-s3/tile-images/event/19_MBB_FinalFour_FC_RGB.png?itok=IulihWXF',
    name: '',
    errorMessage: '',
    loading: false,
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createMarchMadness(
          this.state.name,
          this.state.description,
          this.state.imageUrl
        )
        .send({
          from: accounts[0],
        });
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Layout>
        <h1>Create a New Contest!</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Name</label>
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="National Semifinal Game 1"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Image URL</label>
            <input
              placeholder="https://www.ncaa.com/sites/default/files/public/styles/original/public-s3/tile-images/event/19_MBB_FinalFour_FC_RGB.png?itok=IulihWXF"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Message
            error
            header="Something went wrong"
            content={this.state.errorMessage}
          />
          <Button loading={this.state.loading} primary>
            Create Contest!
          </Button>
          Please note your wallet address will automatically be linked
        </Form>
      </Layout>
    );
  }
}
