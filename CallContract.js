const TX = require("ethereumjs-tx");
const Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/11ee6ef770724cc4a6f466650921ea1f"));
//const { interface, bytecode} = require('./compile');
var starAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newaddress","type":"address"}],"name":"changeowner","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"request","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_reduceSupply","type":"uint256"}],"name":"DecreaseSupply","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newSupply","type":"uint256"}],"name":"IncreaseSupply","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"gameContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
var starContractAddress="0x6469D0F162A455B6B90C75615159F080520D76D1";
var star = new web3.eth.Contract(starAbi,starContractAddress);
const privateKey = new Buffer.from("df41f70a767fce3d45fafe4b3b9cd5aa856ab304a17728c50ed99f43c7bac186","hex");

const Transaction = async(_data)=>{
var gasPric= await web3.eth.getGasPrice();
web3.eth.getTransactionCount("0x114dF342f9649f66E3e670bA29418b4693Fe3dA3").then(count => {
var txData = {
nonce: web3.utils.toHex(count),
chainId:4,
gasLimit: web3.utils.toHex(2500000),
gasPrice: web3.utils.toHex(gasPric*1.5),
to: starContractAddress,
from: "0x114dF342f9649f66E3e670bA29418b4693Fe3dA3",
data: _data
}
var transaction = new TX(txData, {chain: 'rinkeby' }); 
transaction.sign(privateKey);

var serialisedTransaction = transaction.serialize().toString('hex');
web3.eth.sendSignedTransaction('0x' + serialisedTransaction);
});
}
async function ChangeOwner(newOwner){
	try{
	 var ownerChange= await star.methods.changeowner(newOwner).encodeABI();
	Transaction(ownerChange); 
}catch(err){
	throw{message : "ERROR : Owner not changed"};
}
}
async function Transfer(_to,value){
	try{
data1 = await star.methods.transfer(_to,value).encodeABI();
	Transaction(data1);
}catch(err){
	throw{ message : "ERROR : Token not transferred using transfer"};
}
}
async function Approve(_spender,value){
	try{
var approved = await star.methods.approve(_spender,100).encodeABI();
	Transaction(approved);
}catch(err){
	throw{ message : "ERROR : Not approved"};
}
}
async function TransferFrom(_from,_to,value){
try{
var Transferred = await star.methods.transferFrom(_from,_to,value).encodeABI();
	Transaction(Transferred);
	}
catch(err){
	throw{ message : "ERROR : Token not transferred using transferFrom"};
}
}
async function increaseSupply(value){
	try{
	var increasedSupply= await star.methods.IncreaseSupply(value).encodeABI();
	Transaction(increasedSupply);
}catch(err){
	throw{ message : "ERROR : Supply not increased"};
}
}
async function decreaseSupply(value){
	try{
	var _supply= await star.methods.DecreaseSupply(value).encodeABI();
	Transaction(_supply);
}catch(err){
	throw{ message : "ERROR : Supply not decreased"};
}
}
async function getbalance(_address){
	try{
	balance = await star.methods.balanceOf(_address).call();
	console.log(balance);
	return balance;
}catch(err){
	throw{ message : "ERROR : Balance not retrieved"};
}
}
async function callFunctions(){
await ChangeOwner("0xF03F5C17Ba09572C8FF448C715AA6BFfBD8093FD");
}
callFunctions();


//  comment for testing beta
