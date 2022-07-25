const assert = require('assert');
const ganache = require('ganache-cli');
const { interface, bytecode } = require('../compile');
// initalise Web3 constructor
const Web3 = require('web3');
// create instance of web3
const web3 = new Web3(ganache.provider());

let fetchedAccounts;
let inbox;

beforeEach(async () => {
	// Get a list of all accounts
	fetchedAccounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy the contract
	inbox = await new web3.eth.Contract(interface)
		.deploy({ data: bytecode, arguments: ['Hii There !'] })
		.send({ from: fetchedAccounts[0], gas: '1000000' });
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		console.log(inbox);
	});
});
