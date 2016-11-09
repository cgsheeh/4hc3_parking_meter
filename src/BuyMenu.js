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


class BuyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      paymentType: '',
      barCode: '',
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

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  get_barcode = (barcode) => {
    console.log(barcode);
  }

  renderCredit = () => {
    return (
      <div>
        <BarcodeEntry
         pass_barcode_value={this.get_barcode}
        />
        <p>Hello credit!</p>
      </div>
    );
  };

  renderDebit = () => {
    return (
        <p>This is the debit screen.</p>
    );
  };

  renderCoin = () => {
    return (
        <p>This is the coin screen.</p>
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
