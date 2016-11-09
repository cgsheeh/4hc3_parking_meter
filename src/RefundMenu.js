import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton  from 'material-ui/RaisedButton';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

// Code for entering ticket information
class EnterTicketInfoStep extends Component {
	constructor(props) {
		super(props);
		this.state = {
			barcode: ""
		};
	}

	advance_refund_state = () => {
		this.props.refundStateUpdate({
			buy_step: 1,
			barcode: this.state.barcode,
		});
	}

	saveBarcode = (event) => {
		this.setState({
			barcode: event.target.value,
		});
	}

	render() {
		return (
			<div className="EnterTicketInfoStep">
				<TextField 
          			fullWidth={true}
          			floatingLabelText="Enter your ticket barcode"
          			ref="barcode_entry"
          			onChange={this.saveBarcode}
          			value={this.state.barcode}
	          	/>
	         	<RaisedButton 
	         		label="Next" 
	         		onClick={this.advance_refund_state} 
	         	/>
	         	<br />
	        </div>
		);
	}
}

// Code for selecting how to receive the refund
class SelectRefundMethodStep extends Component {

	style = {
		raisedButton: {
			margin: "10px"
		}
	}

	// advance_refund_state = (event) => {
	// 	if ()
	// }

	// handle_key_press() {
	// 	if(event.)
	// }

	render() {
		return (
			<div className="SelectRefundMethodStep">
		         <RaisedButton 
		         	label="Cash" 
		         	onClick={this.cash_refund} 
		         	style={this.style.raisedButton}
		         	ref="cash_refund_button"
		         	onkeypress={this.handle_key_press}
		         />
		         <RaisedButton 
		         	label="Credit" 
		         	onClick={this.advance_refund_state} 
		         	style={this.style.raisedButton}
		         	ref="credit_refund_button"
		         />
		         <RaisedButton
		         	label="Account"
		         	onClick={this.advance_refund_state}
		         	style={this.style.raisedButton}
		         	ref="account_refund_button"
		         />
	        </div>
		);
	}
}

// Code for refund confirmation page
class ConfirmationStep extends Component {
	advance_refund_state = () => {
		this.props.refundStateUpdate({
			buy_step: 0,
		});
	}

	render() {
		return (
			<div className="ConfirmationStep">
	         <h1>ConfirmationStep Content</h1>
	         <RaisedButton label="Next" onClick={this.advance_refund_state} />
	        </div>
		);
	}
}

class RefundMenu extends Component {
  constructor(props) {
    super(props);

    // Bind setState to the RefundMenu so child components can update
    this.setState = this.setState.bind(this);
    this.state = {
      buy_step: 0,
      refund_method: null,
      account: null,
      barcode: null,
      refund_channel: null,
    };
  }

  render() {
    var { buy_step, barcode, refund_channel } = this.state;
    return (
    	<div className="RefundMenu">
	      <Stepper activeStep={buy_step} orientation="vertical">
	      	<Step>
	      		<StepLabel>
	            	<h1>{barcode != null && barcode != "" ? "Barcode: " + barcode : "Enter ticket barcode"}</h1>
	          	</StepLabel>
	          	<StepContent>
	          		<EnterTicketInfoStep refundStateUpdate={this.setState} />
	          		<br />
	          	</StepContent>
	      	</Step>

	      	<Step>
	      		<StepLabel>
	            	<h1>{refund_channel != null && refund_channel != "" ? refund_channel : "Select Refund Payment Option"}</h1>
	          	</StepLabel>
	          	<StepContent>
	          		<SelectRefundMethodStep refundStateUpdate={this.setState} />
	          	</StepContent>
	      	</Step>

	      	<Step>
	      		<StepLabel>
	            	<h1>Confirm Refund</h1>
	          	</StepLabel>
	          	<StepContent>
	      			<ConfirmationStep refundStateUpdate={this.setState} />
	          	</StepContent>
	      	</Step>
	      </Stepper>
      </div>
    );
  }

}

export default RefundMenu;
