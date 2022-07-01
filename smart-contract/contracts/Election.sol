// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
import "hardhat/console.sol";



contract Election
{
    uint startTime;

    struct Candidate{ //custom data type to define a candidate struct
        uint name;   // short name using string
        uint voteCount; // number of accumulated votes
    }

    struct Voter{//store wether or not they have voted and who they have voted for
        bool voted;
        uint voteIndex;
        uint weight;
    }

    address public chairperson; //keeping track of the owner of the contract,
    //they have special rights to authorize voters
    string public name;

    mapping(address => Voter) public voters; //mapping to store voter info

    Candidate[] public candids;

    event ElectResults(string name, uint voteCount);

    constructor() {
        startTime = block.timestamp;
        chairperson = msg.sender;
    }

    function addCandidate(uint candidateId) public payable //timerOver
    {   
        // require(block.timestamp <= startTime + 990, "Time exceeded for registring. Let them Vote!");
        //require messages are too long, they add to code size
      

        candids.push(Candidate(candidateId, 0)); //defining candidates obj using names

    }

    function authorize (address voter) public payable
    {
        require(msg.sender == chairperson, "Chairman must authorize only");
        require(!voters[voter].voted, "Address has voted");

        voters[voter].weight = 1; //only count people we authorize withe weight of one;

    }

    function showCandidate() public view{ //returns (string[uint] memory)


        for(uint i = 0; i < candids.length; i++)
            {
               console.log (i, candids[i].name);
            }

    }

    function voteCandidate(uint voteIndex) public //timerOver1
    {
            //  require(block.timestamp > startTime + 990, "Time not exceeded for registering");
            //  require(block.timestamp <= startTime + 1345, "Time exceeded for voting. View results");

            require(!voters[msg.sender].voted, "Has already voted");
            require(voters[msg.sender].weight != 0, "Has no right to vote");
            voters[msg.sender].voted = true;
            voters[msg.sender].voteIndex = voteIndex;

            candids[voteIndex].voteCount += voters[msg.sender].weight;

    }

    function getWinner() public view
    {

            require(msg.sender == chairperson);

            for(uint i = 0; i < candids.length; i++) //spend gas here, don't do it again
            //using index if loss of data
            {
                //require(block.timestamp > startTime + 120);
                // emit ElectResults(candids[i].name, candids[i].voteCount);
                // console.log(candids[i].name, candids[i].voteCount);
            }

    }

    function getCandidateCount() public view returns(uint){
        return candids.length;
    }

 function getVotersWeight(address voter_address) public view returns(uint){
    console.log("getting voters weight");
    uint result = voters[voter_address].weight;
     
    console.log("voters weight is %s and voters address is %s ",result, voter_address);
   
    return result;
 }

}