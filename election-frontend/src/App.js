import './App.css';
import {useEffect, useState} from 'react';
import election from './artifacts/election.json';

function App() {
  const [result, setResult] = useState(0);
  const [candidateId, setCandidateId] = useState(0);
  const [voterAddress, setVoterAddress] = useState("");
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState("");

  //web3 variables
  const contractAddress = "0x4010288DB00EA98884Aef518929fab00c75d44c5";
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

  // useEffect runs asynchronously and listens to the `[]` bracket and reruns when it variable changes.
  // as well as first time the component mounts
  useEffect(() => {
    checkWalletConnection();
  }, [isWalletConnected]);



  //web 2 functions
  const handleAddCandidate = (e) => {

  };
  const handleAuthorize = (e) => {

  };
  const handleVote = (e) => {

  };
  const getCandidateCount = (e) => {

  };
  const getVoterWeight = (e) => {

  };
  const handleChangeVotersAddress = (e) => {
    setVoterAddress(e.target.value);
    setResult(e.target.value);
  }
  const handleChangeCandidateId = (e) => {
    setCandidateId(e.target.value);
    setResult(e.target.value);
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
        <input type={"string"} placeholder="Candidate's Id"></input>
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
