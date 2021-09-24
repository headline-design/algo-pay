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
  Link
} from 'pipeline-ui'


var indexerURL = "https://algoexplorerapi.io/idx2/v2/accounts/";
const myAlgoWallet = Pipeline.init();

var index = parseInt(localStorage.getItem("index"));
var amount = localStorage.getItem("amount");
var note = localStorage.getItem("note");
var recipient = localStorage.getItem("recipient");
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
      completed: false
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.address !== this.state.address) {
      this.setState({ con_status_text: "Connected" });
      this.setState({ tableVis: true });
      this.updateBalance();
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

  componentDidMount() {
    this.interval = setInterval(() => { if (this.state.txID != "") { this.setState({ completed: true }) } }, 1000);
  }


  render() {
    return <div align="center">
      <Button onClick={() => this.setState({ isOpen: true })}>Buy it now!</Button>
      <Modal isOpen={this.state.isOpen} >
        <Card width="350">
          <div align="right">
            <Button.Outline size="small" onClick={() => this.setState({ isOpen: false })}>Close</Button.Outline>
          </div>
          <div align="center">
            <AlgoButton wallet={myAlgoWallet} context={this} returnTo={"address"} />

            {this.state.tableVis ? <div>
              <Card bg="blue" color="white" maxWidth={"500px"}>{this.state.con_status_text + this.state.balance}<br></br>
                <Button onClick={this.updateBalance}>Refresh</Button></Card>
              <AlgoAddress maxWidth={"350px"} address={this.state.address} textLabels /><br></br>
              <AlgoSendButton
                index={index}
                recipient={recipient}
                amount={amount}
                note={note}
                myAddress={this.state.address}
                wallet={myAlgoWallet}
                context={this}
                returnTo={"txID"}
              /><br></br>
            </div>
              : null}
            {this.state.completed ? <Card bg="grey" color="white" maxWidth={"500px"}>
              <Link href={"https://algoexplorer.io/tx/" + this.state.txID} target="_blank" title="View in AlgoExplorer (5 sec delay)">
                View in AlgoExplorer (5 sec delay)
              </Link>
            </Card> : null}

          </div>

        </Card>
      </Modal>
    </div>
  }
}

export default AlgoPay;
