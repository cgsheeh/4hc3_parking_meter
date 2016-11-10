import RaisedButton  from 'material-ui/RaisedButton';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';


// Properties:
// 	input_text: default text of the entry field
// 	pass_barcode_value: function to pass the barcode value to once valid next click
// 	warning_text: warning text about the validator fxn
// 	required_length: required length of the barcode
class BarcodeEntry extends Component {
	constructor(props) {
		super(props);
		this.state = {
			barcode: "",
			disabled: true,
		};
	}

	// Saves the barcode after each keypress
	// Checks if the current value is valid
	save_barcode = (event) => {
		let barcode_value = event.target.value;
		if(barcode_value != this.props.required_length) {
			this.setState({disabled: false,});
		} else {
			this.setState({disabled: true,});
		}
		this.setState({
			barcode: barcode_value,
		});
	}

	generate_n_digit_num = () => {
		return Math.floor(100000000 + Math.random() * 100000000 * this.props.required_length);
	}

	// onClick callback when next is clicked (ie barcode is valid and submitted)
	submit_barcode = () => {
		var { pass_barcode_value } = this.props;
		pass_barcode_value(this.state.barcode);
	}

	scan = (event) => {
		this.setState({
			disabled: false,
			barcode: this.generate_n_digit_num(),
		});
	}

	render() {
		return (
			<div className="BarcodeEntry">
				<TextField 
          			fullWidth={true}
          			floatingLabelText={this.props.input_text}
          			ref="barcode_entry"
          			onChange={this.save_barcode}
          			value={this.state.barcode}
          			errorText={this.state.disabled ? this.props.warning_text : ""}
	          	/>
	         	<RaisedButton 
	         		label="Next" 
	         		onClick={this.submit_barcode} 
	         		disabled={this.state.disabled}
	         	/>
	         	<RaisedButton
	         		label="Scan"
	         		onClick={this.scan}
	         	/>
	         	<br />
			</div>
		);
	}
}

export default BarcodeEntry;
