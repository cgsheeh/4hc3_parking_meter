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
import {red500, yellow500, blue500, green500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import BuyMenu from './BuyMenu';
import RefundMenu from './RefundMenu';

const styles = {
  button: {
    margin: 12,
    width: 400,
    height: 100
  },
  home: {
    margin: 6,
    width: 200,
    height: 60
  },
  icon: {
    marginRight: 24,
  }
};


class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.state= {
      menu: null,
    };
  }
  home_clicked = () => {
    this.setState({
      menu: 'home',
    });
  }


  purchase_clicked = () => {
    this.setState({
      menu: 'buy',
    });
  }

  refund_clicked = () => {
  this.setState({
      menu: 'refund',
    });
  }

  render_BuyMenu () {
    return (
      <div className="MainMenu">
        <BuyMenu />
          <br />
          <br />
        <RaisedButton
          label="Home"
          labelPosition="before"
          primary={false}
          secondary={false}
          icon={<FontIcon className="material-icons" style={styles.icon}>home</FontIcon>}
          style={styles.home}
          onClick={this.home_clicked}
        />
      </div>
    );
  }
  render_RefundMenu () {
    return (
      <div className="MainMenu">
        <RefundMenu />
          <br />
          <br />
        <RaisedButton
          label="Home"
          labelPosition="before"
          primary={false}
          secondary={false}
          icon={<FontIcon className="material-icons" style={styles.icon}>home</FontIcon>}
          style={styles.home}
          onClick={this.home_clicked}
        />
      </div>
    );
  }

  render() {
    if(this.state.menu == 'buy') return this.render_BuyMenu();
    if(this.state.menu == 'refund') return this.render_RefundMenu();

    var { open } = this.state;
    return (
      <div className="MainMenu">
        <RaisedButton
          label="Purchase Ticket"
          labelPosition="before"
          primary={false}
          secondary={false}
          icon={<FontIcon className="material-icons" style={styles.icon}>confirmation_number</FontIcon>}
          style={styles.button}
          onClick={this.purchase_clicked}
        />

        <RaisedButton
          label="Refund Money"
          labelPosition="before"
          primary={false}
          secondary={false}
          icon={<FontIcon className="material-icons" style={styles.icon}>attach_money</FontIcon>}
          style={styles.button}
          onClick={this.refund_clicked}
        />
      </div>
        );
    }
  }


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
      
          <MainMenu />
          <MainMenuOptions />
          <br />
          <br />
          <br />

      
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
