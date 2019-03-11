import Web3 from 'web3';
let web3;
const secrets = require('../secrets');

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(secrets.rinkeby);
  web3 = new Web3(provider);
}
export default web3;
