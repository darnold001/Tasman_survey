import React from 'react';
import WelcomeQuestions from './components/WelcomeQuestions'
import TasmanLogo from './components/Images/TasmanGeosciences.png'
import MW from './components/Images/MW_Image.jpg'
import './App.css';

function App() {
  return (
    <div className="App" id = 'BackgroundImage' style = {{ backgroundImage: "url("+  +")"}}>
      <img className = 'Logo' src={TasmanLogo} alt="Logo"></img>
      <h2>Tasman Survey App</h2>
      <WelcomeQuestions></WelcomeQuestions>
    </div>
  );
}

export default App;
