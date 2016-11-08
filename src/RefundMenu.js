import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton  from 'material-ui/RaisedButton'
import React, { Component } from 'react';

// Code for entering ticket information
class EnterTicketInfoStep extends Component {
	advance_refund_state = () => {
		this.props.refundStateUpdate({
			buy_step: 1,
		});
	}

	render() {
		return (
			<div className="EnterTicketInfoStep">
	         <h1>EnterTicketInfoStep Content</h1>
	         <RaisedButton label="Next" onClick={this.advance_refund_state} />
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
			<div>
	         <h1>SelectRefundMethodStep Content</h1>
	         <RaisedButton label="Next" onClick={this.advance_refund_state} />
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
    this.setState = this.setState.bind(this);
    this.state = {
      buy_step: 0,
      refund_method: null,
      account: null,
    };
  }

  render() {
    var { buy_step } = this.state;
    return (
    	<div className="RefundMenu">
	      <Stepper activeStep={buy_step} orientation="vertical">
	      	<Step>
	      		<StepLabel>
	            	<h1>Enter ticket barcode</h1>
	          	</StepLabel>
	          	<StepContent>
	          		<EnterTicketInfoStep refundStateUpdate={this.setState} />
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
