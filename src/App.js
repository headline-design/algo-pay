import React, { Component } from 'react'
import './App.css';
import 'react-dropdown/style.css';
import ChartData from './ChartData.js'

import {
  Pipeline,
  AlgoButton,
  AlgoSendButton,
  Button,
  Card,
  AlgoAddress,
  Modal,
  Link,
  Box,
  Heading,
  Text,
  Flex,
} from 'pipeline-ui'


var indexerURL = "https://algoexplorerapi.io/idx2/v2/accounts/";
const myAlgoWallet = Pipeline.init();
const messageTwo = "Please sign & send transaction";
const headingTwo = "Complete Transfer";

var index = parseInt(window.details.index);
var amount = window.details.amount;
var note = window.details.note;
var recipient = window.details.recipient;
class AlgoPay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      update: false,
      asaIndVis: "none",
      myTransactions: ["1"],
      tableVis: false,
      balance: "",
      asaNumbVis: "none",
      asa: "Algorand",
      asaNumb: 0,
      txID: "",
      amount: 1,
      note: "",
      recipient: "",
      con_status_text: "Status: Not Connected",
      address: "",
      ChartData,
      isOpen: false,
      completed: false,
      shhh: true,
      messagio: 'Are you sure you want to connect to MyAlgo?',
      messagioHeadagio: 'Confirm Action',
      stateZeros: 1000000,
      stateAmount: 0,
      assetName: "Algo"
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.address !== this.state.address) {
      this.setState({ con_status_text: "Connected" });
      this.setState({ tableVis: true });
      this.updateBalance();
      this.getZeros();
    }
  }

  updateBalance = () => {
    let url2 = indexerURL + this.state.address;
    fetch(url2)
      .then((response) => response.json())
      .then(data => {
        let myBalance = ". Balance: " + JSON.stringify(data.account.amount / 1000000) + " Algos";
        this.setState({ balance: myBalance });
      }).catch(function () {
        alert("Error occured  " + url2);
      });
  }


  getZeros = () => {
    if (index !== 0) {
      let url2 = "https://algoexplorerapi.io/idx2/v2/assets/" + index;
      console.log(url2)
      fetch(url2)
        .then((response) => response.json())
        .then(data => { console.log(data)
          let zeros = data.asset.params.decimals;
          let value = "1";
          for(var i = 0;i < zeros; i++){value = value + "0"}
          this.setState({stateAmount: amount / parseInt(value)})
          this.setState({assetName: data.asset.params["unit-name"]})
        }).catch(function () {
          alert("Error occured  " + url2);
        });
    }
    else{
      this.setState({stateAmount: amount / 1000000});
    }
  }
  componentDidMount() {
    this.setState({stateAmount: amount})
    this.interval = setInterval(() => {
      if (this.state.txID != "") { this.setState({ completed: true }) }
      if (this.state.address != "") { this.setState({ shhh: false, messagio: messageTwo, messagioHeadagio: headingTwo }) }
    }, 1000);
  }
  close = () => { this.setState({ isOpen: false }) }

  render() {
    return <div align="center">
      <Button className="algopay" onClick={() => this.setState({ isOpen: true })}><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 90 31" height="30" width="40"><svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.15816 340.4242"><g><g><path d="M618.417,246.1612c-.03982,0-.08312-.0013-.123-.0013H536.65959l36.0531,70.3558h52.03219a48.189,48.189,0,1,1,0,96.378h-2.6443l31.8832,62.2187a115.677,115.677,0,0,0,26.9866-12.5177,117.18424,117.18424,0,0,0,54.6087-99.1483v-.0005A117.28428,117.28428,0,0,0,618.417,246.1612Z" transform="translate(-264.42093 -229.7879)" fill="#4b4be0"></path><path d="M666.62278,546.9538l-34.3644-67.0611-34.3328-66.9989-49.38879-96.3779-36.053-70.3561h0a30.08762,30.08762,0,0,0-26.7795-16.3719h-38.5826a30.09537,30.09537,0,0,0-26.7835,16.3705L266.19969,546.9537a15.97386,15.97386,0,0,0,14.2157,23.2583h55.1612l110.8432-216.3053a22.46319,22.46319,0,0,1,39.9828,0l30.2277,58.9871,34.3146,66.9629,46.30089,90.3553h55.1611A15.9736,15.9736,0,0,0,666.62278,546.9538Z" transform="translate(-264.42093 -229.7879)" fill="#1c1ce1"></path></g><g><polygon points="286.524 250.069 252.209 183.106 226.088 183.106 259.484 249.713 286.524 250.069" fill="#1818a8"></polygon><polygon points="226.088 183.106 190.699 183.106 190.512 182.968 110.612 340.424 189.559 340.424 235.645 249.607 251.417 249.607 259.484 249.713 226.088 183.106" fill="#4b4be0"></polygon></g></g></svg></svg>
</Button>
      <Modal isOpen={this.state.isOpen} >
        <Card width={"420px"} p={0}>
          <Button.Text
            icononly
            icon={"Close"}
            color={"moon-gray"}
            position={"absolute"}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={this.close}
          />

          <Box p={4} pb={1} mb={3}>
            <Heading.h3>{this.state.messagioHeadagio}</Heading.h3>
            <Text>{this.state.messagio}</Text>
            {this.state.tableVis ? (<div><h3 id="snoopy">{"My Address: " + this.state.address.slice(0, 20) + '...'}</h3>
              <h3 id="snoopy">{"Amount: " + (this.state.stateAmount || 0) + " " + this.state.assetName}</h3></div>) : null}
          </Box>

          <Flex
            px={4}
            py={3}
            borderTop={1}
            borderColor={"#E8E8E8"}
            justifyContent={"center"}
          >
            <div align="center">
              {this.state.shhh ? (<div>
                <AlgoButton wallet={myAlgoWallet} context={this} returnTo={"address"} />
              </div>) : null}

              {this.state.tableVis ? <div width="100%"> <Flex>
                <AlgoSendButton minWidth="23rem"
                  index={index}
                  recipient={recipient}
                  amount={amount}
                  note={note}
                  myAddress={this.state.address}
                  wallet={myAlgoWallet}
                  context={this}
                  returnTo={"txID"}
                /></Flex><br></br>
              </div>
                : null}
              {this.state.completed ? <Card bg="grey" color="white" maxWidth={"500px"}>
                <Link href={"https://algoexplorer.io/tx/" + this.state.txID} target="_blank" title="View in AlgoExplorer (5 sec delay)">
                  View in AlgoExplorer (5 sec delay)
                </Link>
              </Card> : null}

            </div>
          </Flex>
          <div class="footer primary"><div>2021 HEADLINE INC.</div><div>Powered by <a class="footer-link" href="https://www.pipeline-ui.com" target="_blank" rel="noopener noreferrer">PIPELINE-UI</a> &nbsp;<a class="footer-link" href="mailto:contact@headline-inc.com" target="_blank" rel="noopener noreferrer">Contact</a></div></div>
        </Card>
      </Modal>
    </div>
  }
}

export default AlgoPay;
