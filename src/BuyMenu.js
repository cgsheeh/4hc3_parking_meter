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
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import Dialog from 'material-ui/Dialog';

const styles = {
  button: {
    margin: 12,
    width: 400,
    height: 100
  },
  home: {
    margin: 6,
    width: 200,
    height: 60
  },
  icon: {
    marginRight: 24,
  }
};

class BuyMenu extends Component {
  //constructor for the buymenu with all state variables initialized
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
      print_confirm: false,
      purchase_confirm: false
    };
  }

  //function called upon clicking your payment method
  setPaymentType (event) {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
      paymentType: event,
    });
    console.log(event);
  };

  //function called upon adding clicking on cash buttons, reduces amount due, increases amount paid
  insertCoin (event) {
    const {stepIndex} = this.state;
    var previousAmount = this.state.amountDue;
    var previousAmountPaid = this.state.amountPaid;

    this.setState({
      amountDue: previousAmount - event,
      amountPaid: previousAmountPaid + event,
    });


  };

  //simple function to go to the previous step
  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
    console.log(this.state.timeAmount);
    console.log(this.state.timeStamp);
    console.log(this.state.amountPaid);
  };

  //simple function to go to the next step
  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  //call is made to handle card number
  //used to check against a debit, credit or account number
  get_barcode = (barcode) => {
    var debitCard = 12345;
    var creditCard = 12345;
    var accountNumber = 12345;
    
    if(barcode == debitCard || barcode == creditCard || barcode == accountNumber){
        const {stepIndex} = this.state;
        this.setState({amountDue: 0, stepIndex: stepIndex + 1});
    }

  }

  //this function gets called upon changing the value of time amount of time requested
  handleChange = (event, index, value) => {
    var d = new Date();
    this.setState({
      timeAmount: value,
      timeStamp: d,
      amountDue: value*5,
    });
  }
  //render the credit card buy menu
  renderCredit = () => {
    return (
      <div>
        <p>Pay by Credit Card!</p>
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
          <br />
        
        <BarcodeEntry
         pass_barcode_value={this.get_barcode}
         input_text="Enter Credit Card Number."
        />
        
        
      </div>
    );
  };
  //render the debit card buy menu
  renderDebit = () => {
    return (
        <div>
        <p>Pay by Debit Card!</p>
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
          <br />
        
        <BarcodeEntry
         pass_barcode_value={this.get_barcode}
         input_text="Enter Debit Card Number."
        />
        
        
      </div>
    );
  };
  //render the cash buy menu
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
              <div>
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
                  <br /><br />
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
                  <RaisedButton
                    label={'$50'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={() => this.insertCoin(50)}
                    style={{marginRight: 12}}
                  />
                  <p></p>
                </div>
                <FlatButton
                  label="Next"
                  disabled={this.state.amountDue != 0}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  onTouchTap={this.handleNext}
                />
      </div>
    );
  };
  //render account buy menu blank right now
  renderAccount = () => {
    return (
        <p>This is the account screen.</p>
    );
  };

  confirm_clicked = () => {
    const {stepIndex} = this.state;
    this.setState({
      purchase_confirm: true
    });
  }
  print_clicked = () => {
    const {stepIndex} = this.state;
    this.setState({
      print_confirm: true,
      purchase_fonfirm: false
    });
  }
  cancel_clicked = () => {
    const {stepIndex} = this.state;
    this.setState({
      finished: false,
      stepIndex: 0,
      paymentType: '',
      barCode: '',
      timeAmount: '',
      timeStamp: '',
      amountPaid: 0,
      amountDue: 0,
      purchase_confirm: false,
      print_confirm: false
    });
  }
  //Back button
  renderStepActions(step) {
    const {stepIndex} = this.state;

    const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
      height: '100%',
      maxHieght: 'none'
    };

    const dialog_actions = [
      <FlatButton
        label="Back"
        primary={true}
        onClick={this.cancel_clicked}
      />,
      <FlatButton
        label="Print"
        primary={true}
        onClick={this.print_clicked}
      />,
    ];


    if (step == 2){
      if (this.state.barCode == ""){
        const {stepIndex} = this.state;
        this.setState({
          barCode: Math.floor(Math.random() * (1000000000000))
        });
      }
      return (
        <div>
          <RaisedButton
            label="Confirm Purchase"
            labelPosition="before"
            primary={false}
            secondary={false}
            icon={<FontIcon className="material-icons">directions_car</FontIcon>}
            style={styles.button}
            onClick={this.confirm_clicked}
          />

          <Dialog
          title="Purchase Confirmation"
          autoDetectWindowHeight={true}
          actions={dialog_actions}
          modal={true}
          open={this.state.purchase_confirm}
          onRequestClose={this.cancel_clicked}
          contentStyle={customContentStyle}
        >       
          <img src="images/avatar.png" alt=""/>
          <br />
          Parking time: {this.state.timeAmount}
          <br />
          Amount Paid: {this.state.amountPaid}
          <br />
          {this.state.barCode}
          <br />
          <img src="images/barcode.jpeg" alt=""/>


        </Dialog>
        <Dialog
          title="Ticket Successfully Printed!"
          autoDetectWindowHeight={true}
          actions={
            <FlatButton
              label="Return"
              primary={true}
              onClick={this.cancel_clicked}
            />
          }
          contentStyle={customContentStyle}
          modal={true}
          open={this.state.print_confirm}
          onRequestClose={this.cancel_clicked}
        >
        </Dialog>
          <RaisedButton
            label="Cancel Purchase"
            labelPosition="before"
            primary={false}
            secondary={false}
            icon={<FontIcon className="material-icons">money_off</FontIcon>}
            style={styles.button}
            onClick={this.cancel_clicked}
          />
        </div>
      );
    }

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

  //Entire stepper

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

            </a> 
          </p>
        )}
      </div>
    );
  }
}

export default BuyMenu;
