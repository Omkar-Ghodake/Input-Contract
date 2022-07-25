const path = require('path');
const fs = require('fs');
const solc = require('solc');

// acquiring the path of smart contract
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// reading the content of smart contract
const source = fs.readFileSync(inboxPath, 'utf8');

// compiling the smart contract
var input = {
	language: 'Solidity',
	sources: {
		'Inbox.sol': {
			content: source
		}
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*']
			}
		}
	}
};

var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox;

// console.log(output)

module.exports = {
	interface: output.abi,
	bytecode: output.evm.bytecode.object
}
