import React, { Component } from 'react';
import './App.css';
import mac from './mac.jpeg';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


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
      </div>
      </MuiThemeProvider>
    );
  }
}



export default App;
