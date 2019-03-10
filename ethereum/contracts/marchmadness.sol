pragma solidity >=0.4.22;

contract MarchMadnessFactory {
    address[] public deployedMarchMadness;

    function createMarchMadness(string name, string description, string imageUrl ) public {

        address newMarchMadness = new MarchMadness(msg.sender, name, description, imageUrl);
        deployedMarchMadness.push(newMarchMadness);
    }
    function getDeployedMarchMadness() public view returns (address[]) {
        return deployedMarchMadness;
    }
}

contract MarchMadness {
     struct data {
        string description;
        string name;
        string imageUrl;
    }

    address public manager;
    address public lastWinner;
    address[] public players;
    string[] public names;
    data[] public MarchMadnessdata;

        constructor(address creator, string name, string description, string imageUrl) public {
        //msg object available all over the contract
        manager = creator;
        data memory newMarchMadnessdata = data(name, description, imageUrl);
        MarchMadnessdata.push(newMarchMadnessdata);
    }

    function enter(string name) public payable {
        require(msg.value > .01 ether); //validation - boolean
        players.push(msg.sender);
        names.push(name);
    }

    function random() public view returns (uint) {
        //generates random number
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        //send money to this player from contract balance
        players[index].transfer(this.balance);
        // lastWinner = players[index];
        players = new address[](0);
    }

     function pickSelectedWinner(uint idx) public restricted {
        //send money to this player from contract balance
        players[idx].transfer(this.balance);
        lastWinner = players[idx];
        players = new address[](0);
    }

    modifier restricted(){
        require(msg.sender==manager);
        //sticks code on the underscore
        _;
    }

    function getPlayers() public view returns (address[])  {
        return players;
    }
}
