import React from 'react';
import WelcomeQuestions from './components/WelcomeQuestions'
import WellElevations from './components/WellElevations'
import TasmanLogo from './components/Images/TasmanGeosciences.png'
import './App.css';

function App() {
  return (
    <div className="App" id = 'BackgroundImage' style = {{ backgroundImage: "url("+  +")"}}>
      <img className = 'Logo' src={TasmanLogo} alt="Logo"></img>
      <h2>Survey App</h2>
      <WelcomeQuestions></WelcomeQuestions>
      <WellElevations></WellElevations>
    </div>
  );
}

export default App;
