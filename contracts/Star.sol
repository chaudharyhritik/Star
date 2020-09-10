pragma solidity ^0.4.26;
contract Star{
    using SafeMath for uint;
    string  public name = "Star";
    string  public symbol = "*";
    uint256 public decimals=1;
    uint256 public totalSupply;
    address public ownerAddress;      //address of the owner of contract 
    address public balanceOwnerAddress;    //address of owner of balance.
    mapping(address => uint256) public balances;
    mapping(address =>mapping(address => uint256)) public allowance;
    
event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
    );

event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
    );

constructor(uint256 _initialSupply,address gameContractAddress) public {
        ownerAddress=msg.sender;
        balanceOwnerAddress=gameContractAddress;
        balances[gameContractAddress] = _initialSupply;
        totalSupply=_initialSupply;
    }
function transfer(address _to, uint256 _value) public payable returns (bool success) {
        require(_value>0);
        require(balances[msg.sender]>=_value);
        balances[msg.sender] = balances[msg.sender].sub(_value);     
        balances[_to] =balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] += _value;                                 ///////////if he already approved then it get overrideen =>(Sir 
       emit Approval(msg.sender,_spender, _value);
        return true;
    }
    function balanceOf(address request) public view returns (uint256){
        return balances[request];
    }
    function transferFrom(address _from, address _to, uint256 _value) public payable returns (bool success) {
    require (_value>0);
    require(_value <= allowance[_from][msg.sender]);  //checking that whether sender is approved or not...
    balances[_from]= balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
    allowance[_from][msg.sender]=allowance[_from][msg.sender].sub(_value);
   emit Transfer(_from, _to, _value);
        return true;
    }
function changeowner(address _newaddress) public  returns(bool success){
    require(msg.sender==ownerAddress);
    balances[_newaddress]=balances[_newaddress].add(balances[balanceOwnerAddress]);
    balances[balanceOwnerAddress]=0;
    balanceOwnerAddress=_newaddress;
    return true;
}
function IncreaseSupply(uint256 _newSupply) public payable onlyOwner {
    balances[balanceOwnerAddress]=balances[balanceOwnerAddress].add(_newSupply);  
    totalSupply=totalSupply.add(_newSupply);
}
function DecreaseSupply(uint _reduceSupply) public payable onlyOwner{
    require(_reduceSupply<=balances[balanceOwnerAddress]);
    balances[balanceOwnerAddress]=balances[balanceOwnerAddress].sub(_reduceSupply);
    totalSupply=totalSupply.sub(_reduceSupply);
}
 modifier onlyOwner () {
  require(msg.sender == ownerAddress);
  _;
}
}

library SafeMath {
  
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    
     
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
     
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}