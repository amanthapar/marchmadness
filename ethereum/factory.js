import web3 from './web3';
import MMFactory from './build/MarchMadnessFactory.json';

const factoryInstance = new web3.eth.Contract(
  JSON.parse(MMFactory.interface),
  '0x1769fFbafDBD2942A12AfbF3B5Df9a2d368A6829'
);

export default factoryInstance;
