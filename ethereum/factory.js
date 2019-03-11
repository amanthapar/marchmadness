import web3 from './web3';
import MMFactory from './build/MarchMadnessFactory.json';

const factoryInstance = new web3.eth.Contract(
  JSON.parse(MMFactory.interface),
  '0x25f3e36545ef404972d38b4aC2016557D4e6FC84'
);

export default factoryInstance;
