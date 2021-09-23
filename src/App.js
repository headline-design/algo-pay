import React, { Component } from 'react'

import Chart from "react-apexcharts";

import './App.css';

import 'react-dropdown/style.css';
import ChartData from './ChartData.js'


import {
  Pipeline,
  AsaList,
  AlgoButton,
  AlgoSendButton,
  AlgoFetch,
  Button,
  Heading,
  Card,
  AlgoAddress,
  Field,
  Input,
  Select,
  Blockie,
  SwitchNet,
  Modal
} from 'pipeline-ui'


var indexerURL = "https://algoexplorerapi.io/idx2/v2/accounts/";
var asaNames = AsaList;
const myAlgoWallet = Pipeline.init();
const opt = [
  { value: 'Algorand', label: 'Algorand' },
  { value: 'ASA', label: 'Verified ASA' },
  { value: 'ASAindex', label: 'ASA from Index Number' }
]
class test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      update: false,
      asaIndVis: "none",
      myTransactions: ["1"],
      tableVis: "none",
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
      isOpen: false
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.address !== this.state.address) {
      this.setState({ con_status_text: "Connected" });
      this.setState({ tableVis: "block" });
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

  recipientChangeHandler = (event) => {
    this.setState({ recipient: event.target.value });
  }

  amountChangeHandler = (event) => {
    this.setState({ amount: event.target.value });
  }

  noteChangeHandler = (event) => {
    this.setState({ note: event.target.value });
  }

  asaIndexChangeHandler = (event) => {
    this.setState({ asaNumb: event.target.value });
  }

  asaChangeHandler = (event) => {
    this.setState({ asa: event.value });
    switch (event.value) {
      case "Algorand":
        this.setState({ asaNumbVis: "none", asaIndVis: "none" });
        this.setState({ asaNumb: 0 });
        break;
      case "ASA":
        this.setState({ asaNumbVis: "block", asaIndVis: "none" });
        break;
      case "ASAindex":
        this.setState({ asaNumbVis: "none", asaIndVis: "block" });
        break;
    }
  }

  asaNumbChangeHandler = (event) => {
    this.setState({ asaNumb: event.value });

  }


  render() {
    return <div align="center">

      <Heading>Pipeline UI Demo</Heading>
      <Button onClick={() => this.setState({ isOpen: true })}>Buy it now!</Button>
      <Modal isOpen={this.state.isOpen} >
        <Card width="500">
          <div align="right">
          <Button.Outline size="small" onClick={() => this.setState({ isOpen: false })}>Close</Button.Outline>
          </div>
          <AlgoButton wallet={myAlgoWallet} context={this} returnTo={"address"} />

          <Card bg="blue" color="white" maxWidth={"500px"}>{this.state.con_status_text + this.state.balance}<br></br><Button onClick={this.updateBalance}>Refresh</Button></Card>

          <AlgoAddress maxWidth={"500px"} address={this.state.address} textLabels /><br></br>

          <table>
            <tr>
              <td><Field label="Select your asset:"></Field>
                <div style={{ maxWidth: '500px' }}>
                  <Select
                    style={{ maxWidth: '350px' }}
                    defaultValue={this.state.value}
                    onChange={this.asaChangeHandler}
                    options={opt}
                  />
                </div>
                <div style={{ maxWidth: '500px', display: this.state.asaNumbVis }}>


                  <Field label="Verified ASA's:" required={true} ></Field>
                  <Select
                    defaultValue={this.state.value}
                    onChange={this.asaChangeHandler}
                    options={asaNames} onChange={this.asaNumbChangeHandler} /></div>

                <div style={{ maxWidth: '500px', display: this.state.asaIndVis }}>
                  <Field label="ASA Index Number:" style={{ maxWidth: '500px' }}>
                    <Input style={{ maxWidth: '500px' }} type="text" required={true} placeholder="" onChange={this.asaIndexChangeHandler} />
                  </Field><br></br>
                </div>

                <Field label="Recipient Address" style={{ maxWidth: '500px' }}>
                  <Input style={{ maxWidth: '500px' }} type="text" required={true} placeholder="" onChange={this.recipientChangeHandler} />
                </Field><br></br>
                <Field style={{ maxWidth: '500px' }} label="Amount (in micro Algos)">
                  <Input style={{ maxWidth: '500px' }} type="number" required={true} placeholder="" onChange={this.amountChangeHandler} />
                </Field><br></br>
                <Field style={{ maxWidth: '500px' }} label="Note">
                  <Input style={{ maxWidth: '500px' }} type="text" required={true} placeholder="" onChange={this.noteChangeHandler} />
                </Field><br></br></td>
              <td><AlgoSendButton
                index={this.state.asaNumb}
                recipient={this.state.recipient}
                amount={this.state.amount}
                note={this.state.note}
                myAddress={this.state.address}
                wallet={myAlgoWallet}
                context={this}
                returnTo={"txID"}
              /><br></br>
                <Card bg="blue" color="white" maxWidth={"500px"}>
                  {"Transaction ID: " + this.state.txID}
                </Card></td>
            </tr>
          </table>

        </Card>
      </Modal>
    </div>
  }
}

/* place below code between div tags to include chart
 
<div className="app">
       <div className="row">
         <div className="mixed-chart">
           <Chart
             options={this.state.ChartData.options}
             series={this.state.ChartData.series}
             type="candlestick"
             width="500"
           />
         </div>
       </div>
     </div> */

export default test
