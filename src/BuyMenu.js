import React, { Component } from 'react';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import BarcodeEntry from './BarcodeEntry';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class BuyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      paymentType: '',
      barCode: '',
      timeAmount: '',
      timeStamp: '',
      amountPaid: 0,
      amountDue: 0,
    };
  }

  setPaymentType (event) {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
      paymentType: event,
    });
    console.log(event);
  };

  insertCoin (event) {
    const {stepIndex} = this.state;
    var previousAmount = this.state.amountDue;
    var previousAmountPaid = this.state.amountPaid;

    this.setState({
      amountDue: previousAmount - event,
      amountPaid: previousAmountPaid + event,
    });

    console.log(event);

  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
    console.log(this.state.timeAmount);
    console.log(this.state.timeStamp);
    console.log(this.state.amountPaid);
  };

  get_barcode = (barcode) => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
      barCode: barcode,
    });
  }

  handleChange = (event, index, value) => {
    var d = new Date();
    this.setState({
      timeAmount: value,
      timeStamp: d,
      amountDue: value*5,
    });
  }

  renderCredit = () => {
    return (
      <div>
        <p>Pay by Credit Card!</p>
        
          <SelectField
            floatingLabelText="Time Requested"
            fullWidth={true}
            value={this.state.timeAmount}
            onChange={this.handleChange}
          >
            <MenuItem value={15} primaryText="15 Minutes" />
            <MenuItem value={30} primaryText="30 Minutes" />
            <MenuItem value={45} primaryText="45 Minutes" />
            <MenuItem value={60} primaryText="1 Hour" />
            <MenuItem value={1440} primaryText="All Day" />
          </SelectField>
          <br />
        
        <BarcodeEntry
         pass_barcode_value={this.get_barcode}
         input_text="Enter Credit Card Number."
        />
        
        
      </div>
    );
  };

  renderDebit = () => {
    return (
        <div>
        <p>Pay by Debit Card!</p>
        
          <SelectField
            floatingLabelText="Time Requested"
            fullWidth={true}
            value={this.state.timeAmount}
            onChange={this.handleChange}
          >
            <MenuItem value={15} primaryText="15 Minutes" />
            <MenuItem value={30} primaryText="30 Minutes" />
            <MenuItem value={45} primaryText="45 Minutes" />
            <MenuItem value={60} primaryText="1 Hour" />
            <MenuItem value={1440} primaryText="All Day" />
          </SelectField>
          <br />
        
        <BarcodeEntry
         pass_barcode_value={this.get_barcode}
         input_text="Enter Debit Card Number."
        />
        
        
      </div>
    );
  };

  renderCoin = () => {
    return (
        <div>
        <p>Pay by Cash!</p>
        <p>Amount Due {this.state.amountDue === 0 ? 0: this.state.amountDue}</p>
        <p>Amount Paid {this.state.amountPaid === 0 ? 0: this.state.amountPaid}</p>
          <SelectField
            floatingLabelText="Time Requested"
            fullWidth={true}
            value={this.state.timeAmount}
            onChange={this.handleChange}
          >
            <MenuItem value={15} primaryText="15 Minutes" />
            <MenuItem value={30} primaryText="30 Minutes" />
            <MenuItem value={45} primaryText="45 Minutes" />
            <MenuItem value={60} primaryText="1 Hour" />
            <MenuItem value={1440} primaryText="All Day" />
          </SelectField>
                <RaisedButton
                  label={'$0.25'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.insertCoin(0.25)}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={'$1'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.insertCoin(1)}

                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={'$2'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.insertCoin(2)}
                  style={{marginRight: 12}}
                />
                
                <RaisedButton
                  label={'$5'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.insertCoin(5)}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={'$10'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.insertCoin(10)}
                  style={{marginRight: 12}}
                />
                
                <RaisedButton
                  label={'$20'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.insertCoin(20)}
                  style={{marginRight: 12}}
                />
                <p></p>
                <RaisedButton
                  label={'$50'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.insertCoin(50)}
                  style={{marginRight: 12}}
                />
      </div>
    );
  };

  renderAccount = () => {
    return (
        <p>This is the account screen.</p>
    );
  };

renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }



  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div className="BuyMenu" style={{maxWidth: 680, maxHeight: 400, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Select preferred transaction method</StepLabel>
            <StepContent>
              <p>
                Please select which payment type you would like to use.
              </p>
              <div>
              </div>
                <RaisedButton
                  label={'Credit Card'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.setPaymentType("credit")}

                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={'Debit Card'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.setPaymentType("debit")}
                  style={{marginRight: 12}}
                />
                <p></p>
                <RaisedButton
                  label={'Cash'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.setPaymentType("coin")}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={'Spending Account'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.setPaymentType("account")}
                  style={{marginRight: 12}}
                />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Enter Payment Details</StepLabel>
            <StepContent>
              {this.state.paymentType === 'credit' ? this.renderCredit(): null}  
              {this.state.paymentType === 'debit' ? this.renderDebit(): null}  
              {this.state.paymentType === 'coin' ? this.renderCoin(): null}  
              {this.state.paymentType === 'account' ? this.renderAccount(): null}  
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Confirm Payment</StepLabel>
            <StepContent>
              <p>
                Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>
    );
  }
}

export default BuyMenu;
