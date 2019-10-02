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
      date:"",
      SiteID: ""
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

  renderSiteInfo =()=>{
    return(<div>
      {this.state.SiteID !==0
      ?<SiteInfo
        CurrentSite = {this.state.CurrentSite}
        CurrentClient = {this.state.CurrentClient}
        SiteID = {this.setSiteID}
        />
      :<p></p>
    }
    </div>
    )
  }

  setSiteID = id =>{
    this.setState({SiteID: id})
  }

  render(){
  return (
    <div className="App" id = 'BackgroundImage' style = {{ backgroundImage: "url("+  +")"}}>
      <img className = 'Logo' src={TasmanLogo} alt="Logo"></img>
      <h2>Survey App</h2>
      <WelcomeQuestions
        setCurrentSite = {this.setCurrentSite}
        setCurrentClient = {this.setCurrentClient}
        setSiteID = {this.setSiteID}
        addTopDate = {this.addTopDate}
        dates = {this.state.date}
        CurrentSite={this.state.CurrentSite}
        CurrentClient={this.state.CurrentClient}
      />
      {this.renderSiteInfo()}
    </div>
  );
}
}

