require('dotenv').config();
const ethers = require('ethers');

async function interactWithContract() {
  const provider = new ethers.getDefaultProvider("http://localhost:8545");


  const contractAddress = process.env.CONTRACT_ADDRESS;
  const privateKey = process.env.PRIVATE_KEY;
  const contractABI = require('../hardhat-node/artifacts/contracts/Acc.sol/Acc.json').abi;

  const contract = new ethers.Contract(contractAddress, contractABI, new ethers.Wallet(privateKey, provider));

  const functionName = 'addValue';
  const functionArguments = [10];

  const result = await contract[functionName](...functionArguments);

  console.log('Function Result:', result);

  const myValue = await contract.myValue();

  console.log('myValue:', myValue.toString());
}

interactWithContract().then(() => process.exit(0));
