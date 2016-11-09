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

import BuyMenu from './BuyMenu';
import RefundMenu from './RefundMenu';


class MainMenuBuy extends Component {
  render() {
    return (
      <div className="MainMenuBuy">

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
  constructor(props) {
    super(props);
    this.state = {
      current_menu: 'main',
    };
  }

  render_refund_menu() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <RefundMenu />
        </MuiThemeProvider>
      </div>
    );
  }

  render_buy_menu() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <BuyMenu />
        </MuiThemeProvider>
      </div>
    );
  }

  render_main_menu() {
    return (
      <MuiThemeProvider>
        <div className="App">
      
          <MainMenuBuy />
          <MainMenuOptions />
          <BuyMenu />
          <br />
          <br />
          <br />
          <RefundMenu />
      
        </div>
      </MuiThemeProvider>
    );
  }

  render() {
    let { current_menu } = this.state;
    if (current_menu == 'main'){
      console.log('Rendering main menu');
      return this.render_main_menu();
    } 

    else if (current_menu == 'buy'){
      console.log('Rendering buy menu');
      return this.render_buy_menu();
    }

    else if (current_menu == 'refund'){
      console.log('Rendering refund menu');
      return this.render_refund_menu();
    }
  }
}



export default App;
