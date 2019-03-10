const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/MarchMadnessFactory.json');

const provider = new HDWalletProvider(
  'holiday crowd hard battle false vast giant rain youth bullet clog eternal',
  'https://rinkeby.infura.io/v3/5d5b736ab9dd4c28a07ca69d0e098ad3'
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(
      JSON.parse(compiledFactory.interface)
    )
      .deploy({ data: '0x' + compiledFactory.bytecode })
      .send({ from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
  } catch (err) {
    console.log(err);
  }
};

deploy();
//node deploy.js
