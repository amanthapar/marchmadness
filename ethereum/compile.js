const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');

fs.removeSync(buildPath);

const marchmadnessPath = path.resolve(
  __dirname,
  'contracts',
  'marchmadness.sol'
);
const source = fs.readFileSync(marchmadnessPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDir(buildPath);

// eslint-disable-next-line guard-for-in
for (let contract in output) {
  console.log(output);
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
