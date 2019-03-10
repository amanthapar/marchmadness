import web3 from './web3';
import MarchMadness from './build/MarchMadness.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(MarchMadness.interface), address);
};
