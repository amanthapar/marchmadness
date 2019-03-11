import React, { Component } from 'react';
import { Form, Input, Button, Message, Select } from 'semantic-ui-react';
import MarchMadness from '../ethereum/marchmadness';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

export default class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
    message: '',
    name: '',
    team: '',
  };

  onSubmit = async event => {
    event.preventDefault();
    const marchmadness = MarchMadness(this.props.address);
    this.setState({ loading: true, errorMessage: '' });
    try {
      this.setState({ message: 'Please wait upto 15 seconds' });
      const accounts = await web3.eth.getAccounts();
      await marchmadness.methods.enter(this.state.name, this.state.team).send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether'),
      });
      Router.replaceRoute(`/contests/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, value: '', message: '' });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>DEPOSIT Ether to Join Contest and Win!!</label>
          <Input
            onChange={event => this.setState({ name: event.target.value })}
            value={this.state.name}
            placeholder="Enter Name"
          />
          <Select
            placeholder="Select Team"
            fluid
            value={this.state.team}
            selection
            onChange={(event, data) => {
              this.setState({ team: data.value });
            }}
            options={[
              { key: 1, text: 'Team A', value: 'Team A' },
              { key: 2, text: 'Team B', value: 'Team B' },
            ]}
          />
          <Input
            onChange={event => this.setState({ value: event.target.value })}
            value={this.state.value}
            label="ether"
            placeholder="Good Luck!"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Error!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>
          PAY
        </Button>
        Note: your wallet address will automatically linked
        <h1>{this.state.message}</h1>
      </Form>
    );
  }
}
