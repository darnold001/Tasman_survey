import React, {Component} from 'react';
import WelcomeQuestions from './components/WelcomeQuestions'
import SiteInfo from './components/SiteInfo'
// import WellElevations from './components/WellElevations'
import TasmanLogo from './components/Images/TasmanGeosciences.png'
import './App.css';
// import CalculatedElevations from './components/CalculatedElevations';

export default class App extends Component{
    constructor(){
      super()
    this.state = {
      CurrentClient: "",
      CurrentSite: "",
      date:""
    }
  }

  setCurrentClient = (client) =>{
    this.setState({
      CurrentClient: client
    })
  }

  setCurrentSite = site =>{
    this.setState({
      CurrentSite: site
    })
  }
  addTopDate = date =>{
    this.setState({
      date: date
    })
  }
  render(){
  return (
    <div className="App" id = 'BackgroundImage' style = {{ backgroundImage: "url("+  +")"}}>
      <img className = 'Logo' src={TasmanLogo} alt="Logo"></img>
      <h2>Survey App</h2>
      <WelcomeQuestions
        setCurrentSite = {this.setCurrentSite}
        setCurrentClient = {this.setCurrentClient}
        addTopDate = {this.addTopDate}
        dates = {this.state.date}
        CurrentSite={this.state.CurrentSite}
        CurrentClient={this.state.CurrentClient}
      />
      {/* <SiteInfo>
        CurrentSite = {this.state.CurrentSite}
        CurrentClient = {this.state.CurrentClient}
      </SiteInfo> */}
  
    </div>
  );
}
}

