import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import React, { Component } from 'react';

class DialogNumberPad extends Component {

	static defaultProps = {
		isPadOpen: false
	}

	constructor(props) {
	    super(props);
	    this.state = {
	      	numberValue:''
	    }
	}

	handleChange = (event) => {
	    this.setState({
	      	numberValue: event.target.value,
	    });
	}

	setNumber = (event) => {
		let num = this.state.numberValue
		if (event === 'delete'){
			this.setState({
				numberValue: num.slice(0,-1)
			})
		}
		else {
			this.setState({
				numberValue: num + event
			})
		}
	}

	getValue = (event) => {
		return this.state.numberValue
	}

	cancel_clicked = () => {
		this.props.closeDialog()
	}

	clearValue = () => {
		this.setState({
			numberValue: ''
		})
	}

	render() {

		const customContentStyle = {
	      	width: '100%'
	    }

	    const customBodyStyle = {
	    	position: 'relative',
	    	margin: 'auto',
	    	textAlign: 'center'
	    }
		return (
			<div>
				<Dialog
					title="Number Touch Pad"
          			titleStyle={{textAlign:'center', paddingBottom:'0'}}
					contentStyle={customContentStyle}
					bodyStyle={customBodyStyle}
					open={this.props.isPadOpen}
          			onRequestClose={this.cancel_clicked}
					>
					<TextField
						value={this.state.numberValue}
		            	onChange={this.handleChange}
		            	floatingLabelText={'Enter Number'} >
		            </TextField>
		            <br />
		            <RaisedButton
		            	label={'1'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber(1)} />
		            <RaisedButton
		            	label={'2'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber(2)} />
		            <RaisedButton
		            	label={'3'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber(3)} />
		            <br />
					<RaisedButton
		            	label={'4'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber(4)} />
		            <RaisedButton
		            	label={'5'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber(5)} />
		            <RaisedButton
		            	label={'6'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber(6)} />
		            <br />
		            <RaisedButton
		            	label={'7'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber(7)} />
		            <RaisedButton
		            	label={'8'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber(8)} />
					<RaisedButton
		            	label={'9'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber(9)} />
		            <br />
		            <RaisedButton
		            	label={'-'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber('-')} />
		            <RaisedButton
		            	label={'0'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber(0)} />
		            <RaisedButton
		            	label={'<-'}
		            	primary={true}
		            	onTouchTap={() => this.setNumber('delete')} />
		            <br /><br />
		            <RaisedButton
		              label="Enter"
		              secondary={true}
		              onClick={this.cancel_clicked}
		            />
		        </Dialog>
			</div>
		)
	}
}
export default DialogNumberPad;