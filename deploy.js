const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
const provider = new HDWalletProvider(
	'wise outer fame crisp bread involve east cruel upon clarify toss injury',
	'https://rinkeby.infura.io/v3/11ee6ef770724cc4a6f466650921ea1f'
	);
const web3=new Web3(provider);
const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Attempting to deploy from account ' ,accounts[0]);
	const result = await new web3.eth.Contract(JSON.parse(interface))
	.deploy({data: bytecode,arguments :['1000000000',"0x5B60C07a6ed3C4a426891be4F6F16B025224b63F"]})
	.send({from: accounts[0] ,gas:'1000000'});
	console.log('Contract deployed to ', result.options.address);
};
deploy();


#testing comment master
