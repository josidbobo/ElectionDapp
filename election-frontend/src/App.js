import './App.css';
import {useEffect, useState} from 'react';
import election from './artifacts/contracts/Election.sol/MyVotingApp.json';
import { ethers } from 'ethers';

function App() {
  const [result, setResult] = useState(0);
  const [candidateId, setCandidateId] = useState(0);
  const [voterAddress, setVoterAddress] = useState("");
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState("");
  const [voteIndex, setVoteIndex] = useState(0);

  //web3 variables
  const contractAddress = "0xB86323e419BE43cF291eac40D4aea3E524F51035";
  const ContractAbi = election.abi;

  //web3 stuffs
  const checkWalletConnection = async () => {
    try{
      if(window.ethereum){
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        const account = accounts[0];
        setConnectedWallet(account); 
        setWalletConnected(true);
      }else{ 
        alert("Ethereum Client not detected");
      }
    }catch(e){ 
      console.log(e.message);
    }
  };

  //web3 functions
  const addCandidate = async candidateId => {
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ContractAbi, signer);
        const tx = await contract.addCandidate(candidateId);
        tx.wait();
        alert("Candidate added!");
    }catch(e){ 
      console.log(e.message);
    }
  }

  const getCandidateNumber = async () => {
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ContractAbi, signer);
        const outcome = await contract.getCandidateCount();
        setResult(outcome.toString());
        console.log(outcome.toString());
    }catch(e){ 
      console.log(e.message);
    }
  }

  const getVotersWeight = async (voterAddress) => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ContractAbi, signer);
      const outcome = await contract.getVotersWeight(voterAddress);
      setResult(outcome.toString());
      console.log(outcome.toString());
  }catch(e){ 
    console.log(e.message);
  }
}

const authorization = async (voterAddress) => {
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ContractAbi, signer);
    await contract.authorize(voterAddress);
    alert(`${voterAddress} authorized`);
  }catch(e){
    console.log(e);
  }
}

const Voting = async (voteIndex) => {
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ContractAbi, signer);
    await contract.voteCandidate(voteIndex);
    alert(`Voting successful`);
  }catch(e){
    alert(e.message);
  }
}
    

  // useEffect runs asynchronously and listens to the `[]` bracket and reruns when it variable changes.
  // as well as first time the component mounts
  useEffect(() => { 
    checkWalletConnection();
  }, [isWalletConnected]);



  //web 2 functions
  const handleAddCandidate = (e) => {
    addCandidate(candidateId);
  };
  const handleAuthorize = (e) => {
    authorization(voterAddress);
  };
  const handleVote = (e) => {
    setVoteIndex(e.target.value);
    Voting(voteIndex);
  };
  const getCandidateCount = (e) => {
    getCandidateNumber();
  };
  const getVoterWeight = (e) => {
    getVotersWeight(voterAddress); 
  };
  const handleChangeVotersAddress = (e) => {
    setVoterAddress(e.target.value);
  }
  const handleChangeCandidateId = (e) => {
    setCandidateId(e.target.value);
  }



  return (
    <div className="App-header">
      {isWalletConnected?<span style={{backgroundColor: "red"}}>{`Connected Wallet address is ${connectedWallet}`}</span>:"Not Connected"}
      <section>
      <h1>{result}</h1 >
        <span>Add candidate</span>
        <br/>
        <input type={"number"} placeholder="candidateId" onChange={(e) => handleChangeCandidateId(e)}></input>
        <br></br>
        <button style={{backgroundColor: "green", borderColor: "green"}} onClick={(e) => handleAddCandidate(e)}>Add Candidate</button>
      </section>


      <section style={{marginTop: "30px"}}>
        <span>Authorize</span>
        <br/>
        <input type={"string"} placeholder="Voter's address" onChange={(e) => handleChangeVotersAddress(e)}></input>
        <br></br>
        <button style={{backgroundColor: "green", borderColor: "green"}} onClick={(e) => handleAuthorize(e)}>Authorize</button>
      </section>


      <section style={{marginTop: "30px"}}>
        <span>Vote</span>
        <br/>
        <input type={"number"} placeholder="Candidate's Id"></input>
        <br></br>
        <button style={{backgroundColor: "green", borderColor: "green"}} onClick={(e) => handleVote(e)}>Vote</button>
      </section>


      <section style={{marginTop: "30px"}}>
        <br/>
        
        <br></br>
        <button style={{backgroundColor: "green", borderColor: "green"}} onClick={(e) => getCandidateCount(e)}>getCandidateCount</button>
        <button style={{backgroundColor: "green", borderColor: "green", marginLeft: "30px"}} onClick={(e) => getVoterWeight(e)}>getVoterWeight</button>
      </section> 


    </div>
  );
}

export default App;
