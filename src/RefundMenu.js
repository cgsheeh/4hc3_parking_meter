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
	advance_refund_state = () => {
		this.props.refundStateUpdate({
			buy_step: 2,
		});
	}

	render() {
		return (
			<div className="SelectRefundMethodStep">
		         <RaisedButton 
		         	label="Cash" 
		         	onClick={this.advance_refund_state} 
		         />
		         <RaisedButton 
		         	label="Credit" 
		         	onClick={this.advance_refund_state} 
		         	children={<FontIcon className="material-icons">credit_card</FontIcon>}
		         />
		         <RaisedButton
		         	label="Account"
		         	onClick={this.advance_refund_state}
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
    };
  }

  render() {
    var { buy_step, barcode } = this.state;
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
	            	<h1>Select Refund Payment Option</h1>
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
