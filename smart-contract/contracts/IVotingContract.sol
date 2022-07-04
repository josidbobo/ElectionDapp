// SPDX-License-Identifier: GPL-3.0

pragma solidity = 0.8.7;


interface IVotingContract{

//only one address should be able to add candidates
    function addCandidate(bytes32 candidate) external returns(bool);

    
    function voteCandidate(uint candidateId) external returns(bool);

    //getWinner returns the name of the winner
    function getWinner() external returns(bytes32);
}