import Web3 from 'web3';
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/5d5b736ab9dd4c28a07ca69d0e098ad3'
  );
  web3 = new Web3(provider);
}
export default web3;
