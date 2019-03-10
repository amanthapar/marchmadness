import web3 from './web3';
import MMFactory from './build/MarchMadnessFactory.json';

const factoryInstance = new web3.eth.Contract(
  JSON.parse(MMFactory.interface),
  '0x8853FF5D959295D20db2F9Cb144760860F8d5e97'
);

export default factoryInstance;
