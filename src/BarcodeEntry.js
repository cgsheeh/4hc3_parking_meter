import RaisedButton  from 'material-ui/RaisedButton';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DialogNumberPad from './DialogNumberPad'; 

// Properties:
// 	input_text: default text of the entry field
// 	pass_barcode_value: function to pass the barcode value to once valid next click
// 	warning_text: warning text about the validator fxn
// 	required_length: required length of the barcode
class BarcodeEntry extends Component {
	style = {
		margin: "10px",
	}

	constructor(props) {
		super(props);
		this.state = {
			barcode: "",
			disabled: true,
			isOpen: false
		};
	}

	// Saves the barcode after each keypress
	// Checks if the current value is valid
	save_barcode = (event) => {
		let barcode_value = ''
		if (event.target === 'undefined') {
			barcode_value = event.target.value;
		} else {
			barcode_value = event
		}
		if(barcode_value.length == this.props.required_length) {
			this.setState({disabled: false,});
		} else {
			this.setState({disabled: true,});
		}
		this.setState({
			barcode: barcode_value,
		});
	}

	generate_n_digit_num = () => {
		return Math.random().toString().slice(2, 2 + this.props.required_length);
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

	changeOpen = () => {
	    this.setState({
	      isOpen: true
	    })
	  }

	  closeDialog = () => {
	    this.setState({
	      isOpen: false,
	      barcode: this.refs.numPadBarcode.getValue()
	    })
	    this.refs.numPadBarcode.clearValue()
	    this.save_barcode(this.refs.numPadBarcode.getValue())
	  }

	render() {
		return (
			<div className="BarcodeEntry">
				<div>
					<TextField 
	          			fullWidth={true}
	          			floatingLabelText={this.props.input_text}
	          			ref="barcode_entry"
	          			onClick={this.changeOpen}
	          			onChange={this.save_barcode}
	          			value={this.state.barcode}
	          			errorText={this.state.disabled ? this.props.warning_text : ""}
		          	/>
			        <DialogNumberPad
			          ref='numPadBarcode'
			          isPadOpen={this.state.isOpen}
			          closeDialog={this.closeDialog}
			        />
	          	</div>
	         	<RaisedButton 
	         		label="Next" 
	         		onClick={this.submit_barcode} 
	         		disabled={this.state.disabled}
	         		primary={true}
	         		style={this.style}
	         	/>
	         	<RaisedButton
	         		label="Scan"
	         		onClick={this.scan}
	         		primary={true}
	         		style={this.style}
	         	/>
	         	<br />
			</div>
		);
	}
}

export default BarcodeEntry;
