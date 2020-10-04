import React, { Component } from 'react';
import Web3 from 'web3'
//import logo from '../logo.png';
import './App.css';
import Certification from '../abis/Certification.json'
//import Certification1 from '../contracts/Certification.sol'
class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Certification.networks[networkId]
    if(networkData) {
      const certification = web3.eth.Contract(Certification.abi, networkData.address)
      this.setState({ certification })
     //var certificatesList=[]
     var count=await certification.methods.id().call()
     count= count.toNumber()
      this.setState({ count })
      //console.log(count)
      for(var i=1;i<=count;i++)
      {
        
        const certificate=await certification.methods.certificates(i).call()
        this.setState({
          certificates: [...this.state.certificates, certificate]
        })
        

      }
      console.log({certificates:this.state.certificates})
    } else {
      window.alert('Certification contract not deployed to detected network.')
      console.log(networkData)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      certification:null,
      account: '',
      count:0,
      certificates:[],
      loading: true
      
    }
   
    this.generatecertificate=this.generatecertificate.bind(this)

    
  }
 
  generatecertificate(name,orgName, courseName) {
    this.setState({ loading: true })
    this.state.certification.methods.generatecertificate(name,orgName, courseName).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    this.generatecertificate=this.generatecertificate.bind(this)
  }

  render() {
    return (
      <div>
     <h1>Your account no is: <p>{this.state.account}</p></h1>
      <div>
        <h1>Add Certificate</h1>
        
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.Name.value
          const orgName = this.orgName.value
          
          const courseName = this.courseName.value
          this.generatecertificate(name, orgName,courseName)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="Name"
              type="text"
              ref={(input) => { this.Name = input }}
              className="form-control"
              placeholder="Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="orgName"
              type="text"
              ref={(input) => { this.orgName = input }}
              className="form-control"
              placeholder="orgName"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="courseName"
              type="text"
              ref={(input) => { this.courseName = input }}
              className="form-control"
              placeholder="courseName"
              required />
          </div>
          
          <button type="submit" className="btn btn-primary">Generate Certificate</button>

        </form>
        <h1>certificates</h1>
        {this.state.certificates.map((certificate,key)=>
        {
          return(
            <div>
              <h1>name:
                {certificate.display_name}
                Hash Number:
                {certificate[3]}
              </h1>
            </div>
          )
        }
        )}
      </div>
      </div>
      
    );
  }
}

export default App;
