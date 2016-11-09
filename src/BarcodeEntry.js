import RaisedButton  from 'material-ui/RaisedButton';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class BarcodeEntry extends Component {
	constructor(props) {
		super(props);
		this.state = {
			barcode: "",
		};
	}

	invalid_barcode = () => {
		let { barcode } = this.state;
		return barcode == "" || barcode == null;
	}

	save_barcode = (event) => {
		let barcode_value = event.target.value;
		this.setState({
			barcode: barcode_value,
		});
	}

	submit_barcode = () => {
		var { pass_barcode_value } = this.props;
		pass_barcode_value(this.state.barcode);
	}

	render() {
		return (
			<div className="BarcodeEntry">
				<TextField 
          			fullWidth={true}
          			floatingLabelText="Enter your ticket barcode"
          			ref="barcode_entry"
          			onChange={this.save_barcode}
          			value={this.state.barcode}
	          	/>
	         	<RaisedButton 
	         		label="Next" 
	         		onClick={this.submit_barcode} 
	         		disabled={this.invalid_barcode()}
	         	/>
	         	<br />
			</div>
		);
	}
}

export default BarcodeEntry;
