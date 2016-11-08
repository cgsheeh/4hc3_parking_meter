import React, { Component } from 'react';
import './App.css';
import mac from './mac.jpeg';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class BuyMenu extends Component {
  constructor(props) {
    super(props);
    debugger
    this.state = {
      finished: false,
      stepIndex: 0,
      paymentType: '',
    };
  }

  componentDidUpdate(prevProps, prevState){
    debugger
  }

  setPaymentType (event) {
    const {stepIndex} = this.state;
    debugger
    console.log(this.state);
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
      paymentType: event,
    });
    console.log(this.state.paymentType);
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };



renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
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

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div className="BuyMenu" style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
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
                  testValue={"Testing this shit"}
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
                <RaisedButton
                  label={'Cash'}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={() => this.setPaymentType("coin")}
                  style={{marginRight: 12}}
                />
              
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Make transaction</StepLabel>
            <StepContent>
              <p>Please insert your </p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Create an ad</StepLabel>
            <StepContent>
              <p>
                Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.
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
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>
    );
  }
}

class MainMenuHeader extends Component {
  render() {
    var { header_name } = this.props;
    return (
      <div className="MainMenuHeader">
        <h1>{header_name}</h1>
      </div>
    )
  }
}

class MainMenuBuy extends Component {
  render() {
    return (
      <div classname="MainMenuBuy">

      </div>
    )
  }
}

class MainMenuOptions extends Component {
  render() {
    return (
      <div className="MainMenuOptions">
        <RaisedButton label="Test" />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <MainMenuHeader header_name="Welcome to McMaster University"/>
        <MainMenuBuy />
        <MainMenuOptions />
        <BuyMenu />
      </div>
      </MuiThemeProvider>
    );
  }
}



export default App;
