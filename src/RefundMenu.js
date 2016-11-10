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
			barcode: "",
			warning_text: "",
		};
	}

	must_be_7_digit = (barcode) => {
		return barcode != "" && barcode != null && barcode.length == 7;
	}

	next_pressed = (barcode) => {
		this.props.refundStateUpdate({
			buy_step: 1,
			barcode: barcode,
		});
	}

	render() {
		return (
			<div className="EnterTicketInfoStep">
				<BarcodeEntry 
					input_text="Enter or scan your ticket barcode"
					pass_barcode_value={this.next_pressed}
					warning_text="Number must be 7-characters"
					required_length={7}
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

	constructor(props) {
		super(props);
		this.state = {
			refund_type: null,
		};
	}

	select_account = () => {
		this.props.refundStateUpdate({

		});
	}

	select_credit = () => {
		this.setState({
			refund_type: 'credit'
		});
	}

	select_cash = () => {
		this.props.refundStateUpdate({
			buy_step: 2,
			refund_channel: 'Cash Refund',
		});
	}

	render_initial_menu() {
		return (<div>
		         <RaisedButton 
		         	label="Cash" 
		         	onClick={this.select_cash} 
		         	style={this.style.raisedButton}
		         	ref="cash_refund_button"
		         />
		         <RaisedButton 
		         	label="Credit" 
		         	onClick={this.select_credit} 
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

	credit_card_entered = (barcode) => {
		this.props.refundStateUpdate({
			buy_step: 2,
			credit_card: barcode,
			refund_channel: 'credit card',
		})
	}

	render_credit_menu() {
		return (
			<div>
				<BarcodeEntry 
					input_text="Enter your credit card number"
					pass_barcode_value={this.credit_card_entered}
					warning_text="Number must be 9-characters"
					required_length={9}
				/>
			</div>
		);
	}

	render() {
		let { refund_type } = this.state;
		let selective_menu = "";
		if(refund_type == 'credit'){
			selective_menu = this.render_credit_menu();
		} 

		else if (refund_type == 'account'){
			selective_menu = (<h1>ACCOUNT ye</h1>);
		}

		else {
			selective_menu = this.render_initial_menu();
		}
		return (
			<div className="SelectRefundMethodStep">
				<div>
					<h3>McMaster will refund $5 on your ticket.<br /> How would you like to receive your payment?</h3>
				</div>
				{selective_menu}
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

	confirm_pressed = () => {
		this.props.refundStateUpdate({
			buy_step: 0,
		});
	}

	back_pressed = () => {
		this.props.refundStateUpdate({
			buy_step: 1,
			refund_channel: null,
		});
	}

	render() {
		let { amount, payment_method } = this.props;
		return (
			<div className="ConfirmationStep">
	         <h1>You will receive ${amount} via {payment_method}.</h1>
	         <RaisedButton 
	         	label="Confirm" 
	         	backgroundColor="#a4c639"
	         	onClick={this.confirm_pressed} 
	         	style={this.style.raisedButton}
	         	icon={<FontIcon className="material-icons">thumb_up</FontIcon>}
	         	labelColor="#ffffff"
	         />
	         <RaisedButton 
	         	label="Go Back" 
	         	secondary={true}
	         	onClick={this.back_pressed} 
	         	style={this.style.raisedButton}
	         	backgroundColor="red"
	         	icon={<FontIcon className="material-icons">thumb_down</FontIcon>}
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
      ticket_action: "",
      credit_card: "",
    };
  }

  render() {
    var { buy_step, barcode, refund_channel, credit_card, ticket_action } = this.state;
    return ( 
    	<div className="RefundMenu">
    	  <h1>Refund a Ticket</h1>
	      <Stepper activeStep={buy_step} orientation="vertical">
	      	<Step>
	      		<StepLabel>
	            	<h1>{barcode != null && barcode != "" ? "Barcode: " + barcode : "Enter ticket barcode"}</h1>
	          	</StepLabel>
	          	<StepContent>
	          		<EnterTicketInfoStep refundStateUpdate={this.setState} />
	          		<br/>
	          	</StepContent>
	      	</Step>

	      	<Step>
	      		<StepLabel>
	      			<h1>{ticket_action != null && ticket_action != "" ? ticket_action : "Select Ticket Action"}</h1>
	      		</StepLabel>
	      		<StepContent>
	      			<h1>Select the action your would like to take on your ticket</h1>
	      		</StepContent>
	      	</Step>

	      	<Step>
	      		<StepLabel>
	            	<h1>{refund_channel != null && refund_channel != "" ? refund_channel + " " + credit_card : "Select Payment Option"}</h1>
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
	      			<ConfirmationStep 
	      				refundStateUpdate={this.setState}
	      				amount="5"
	      				payment_method={refund_channel}
	      			/>
	          	</StepContent>
	      	</Step>
	      </Stepper>
      </div>
    );
  }

}

export default RefundMenu;
