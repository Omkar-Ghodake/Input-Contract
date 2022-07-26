const assert = require('assert');
const ganache = require('ganache-cli');
const { interface, bytecode } = require('../compile');
// initalise Web3 constructor
const Web3 = require('web3');
// create instance of web3
const web3 = new Web3(ganache.provider());

let fetchedAccounts;
let inbox;
const INITIAL_STRING = 'Hii There !';

beforeEach(async () => {
	// Get a list of all accounts
	fetchedAccounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy the contract
	inbox = await new web3.eth.Contract(interface)
		.deploy({ data: bytecode, arguments: [INITIAL_STRING] })
		.send({ from: fetchedAccounts[0], gas: '1000000' });
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		// console.log(inbox);
		assert.ok(inbox.options.address);
	});

	it('it has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(INITIAL_STRING, message);
	});

	it('can change the message', async () => {
		const txn = await inbox.methods.setMessage('Bye there').send({ from: fetchedAccounts[0] });
		// console.log(txn)
		const message = await inbox.methods.message().call();
		assert.equal('Bye there', message);
	});
});
