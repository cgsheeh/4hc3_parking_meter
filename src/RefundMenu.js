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

import BarcodeEntry from './BarcodeEntry';

// Code for entering ticket information
// TODO: can't advance unless correct barcode entered
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

	render() {
		return (
			<div className="EnterTicketInfoStep">
				<BarcodeEntry 
					pass_barcode_function={this.retrieve_barcode}
				/>
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

	select_account() {

	}

	select_credit() {

	}

	select_cash = () => {
		this.props.refundStateUpdate({
			buy_step: 2,
			refund_channel: 'Cash Refund',
		});
	}

	render() {
		return (
			<div className="SelectRefundMethodStep">
		         <RaisedButton 
		         	label="Cash" 
		         	onClick={this.select_cash} 
		         	style={this.style.raisedButton}
		         	ref="cash_refund_button"
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
	style = {
		raisedButton: {
			margin: "10px"
		}
	}

	advance_refund_state = () => {
		this.props.refundStateUpdate({
			buy_step: 0,
		});
	}

	render() {
		return (
			<div className="ConfirmationStep">
	         <h1>ConfirmationStep Content</h1>
	         <RaisedButton 
	         	label="Next" 
	         	onClick={this.advance_refund_state} 
	         	style={this.style.raisedButton}
	         />
	        </div>
		);
	}
}

// Code for Refund/Add menu
class RefundMenu extends Component {
  constructor(props) {
    super(props);

    // Bind setState to the RefundMenu so child components can update
    this.setState = this.setState.bind(this);
    this.state = {
      buy_step: 0,
      account: null,
      barcode: null,
      refund_channel: null,
    };
  }

  get_barcode = (barcode) => {
  	this.setState({
  		barcode: barcode,
  		buy_step: 1,
  	});
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
	          		<BarcodeEntry 
	          			pass_barcode_value={this.get_barcode}
	          		/>
	          		<br/>
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
