const TX = require("ethereumjs-tx");
const Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/11ee6ef770724cc4a6f466650921ea1f"));
//const { interface, bytecode} = require('./compile');
var starAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newaddress","type":"address"}],"name":"changeowner","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"request","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_reduceSupply","type":"uint256"}],"name":"DecreaseSupply","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newSupply","type":"uint256"}],"name":"IncreaseSupply","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"gameContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
var starContractAddress="0x0c560a5432EbEDeb95505B04c4d0b781493cc1d6";
var star = new web3.eth.Contract(starAbi,starContractAddress);
const privateKey = new Buffer.from("df41f70a767fce3d45fafe4b3b9cd5aa856ab304a17728c50ed99f43c7bac186","hex");
const privateKey1 = new Buffer.from("1d74031771cabab38b07d31937bdcf279c712f0e2f358c1072bc0cf27898e004","hex");

const Transaction = async(data1)=>{
var gasPric= await web3.eth.getGasPrice();
web3.eth.getTransactionCount("0x114dF342f9649f66E3e670bA29418b4693Fe3dA3").then(count => {
var txData = {
nonce: web3.utils.toHex(count),
chainId:4,
gasLimit: web3.utils.toHex(2500000),
gasPrice: web3.utils.toHex(gasPric*1.5),
to: "0x0c560a5432EbEDeb95505B04c4d0b781493cc1d6",
from: "0x114dF342f9649f66E3e670bA29418b4693Fe3dA3",
data: data1
}
var transaction = new TX(txData, {chain: 'rinkeby' }); 
transaction.sign(privateKey);

var serialisedTransaction = transaction.serialize().toString('hex');
 web3.eth.sendSignedTransaction('0x' + serialisedTransaction);
});
}
async function ChangeOwner(newOwner){
	try{
	 data1 = await star.methods.changeowner(newOwner).encodeABI();//Account3 
	Transaction(data1); 
}catch(err){
	console.log("Error in changeowner");
}
};
async function Transfer(_to,value){
	try{
data1 = await star.methods.transfer(_to,value).encodeABI();
	Transaction(data1);
//Account2
}catch(err){
	console.log("Error in transfer");
}
};
async function Approve(_spender,value){
	try{
data1 = await star.methods.approve(_spender,100).encodeABI();
	Transaction(data1);
}catch(err){
	console.log("Error in Approve");
}
};
async function TransferFrom(_from,_to,value){
try{
data1 = await star.methods.transferFrom(_from,_to,value).encodeABI();
	Transaction(data1);
	}
catch(err){
	console.log("Error in Transfer")
}
};
async function increaseSupply(value){
	try{
	data1 = await star.methods.IncreaseSupply(value).encodeABI();
	Transaction(data1);
}catch(err){
	console.log("Error in increase supply");
}
};
async function decreaseSupply(value){
	try{
	data1= await star.methods.DecreaseSupply(value).encodeABI();
	Transaction(data1);
}catch(err){
	console.log("Error in decreaseSupply");
}
}
async function getbalance(_address){
	try{
	data1= await star.balanceOf(_address).call();
	return data1;
}catch(err){
	console.log("Error in getbalance");
}
}
async function callFunctions(){
await ChangeOwner("0xC6EBFdb69A29D77EefdeaaeaB2288Ad2Ee86EEB8");
};
callFunctions();