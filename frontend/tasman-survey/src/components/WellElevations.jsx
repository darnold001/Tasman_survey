 import React  from 'react'
 import '../components/WellElevations.css'
 import RadioButton from '../components/WellElevationRadioButton'
const wellsAPI = 'http://localhost:3000/wells'
 export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          wellName: "",
          rodM: "",
          notes: "",
          selectedOption: "",
          latitude: "",
          longitude: "",
          elevation: 0,
          AMSL: 0,
          CPRod: 0.0,
          CorrectedElev: 0
        };
      this.radioChange = this.radioChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    addClick(){
      this.setState(prevState => ({ 
          users: [...prevState.users, { wellName: "", rodHeight: "" , selectedOption: ""}]
      }))
    }
    radioChange(e) {
      this.setState({
        selectedOption: e.currentTarget.value
      });
    }

    addElevation = (event) =>{
        this.setState({elevation: event.target.value})
    }
    handleLatChange = (event) =>{
      this.setState({latitude: event.target.value})
    }
    handleAMSLChange = (event) =>{
      this.setState({AMSL: event.target.value})
    }
    handleLongChange = (event) =>{
      this.setState({longitude: event.target.value})
    }
    addAMSLElevation = (event) =>{
      this.setState({AMSLElevation: event.target.value})
    }
    handleRodChange = (event) =>{
        this.setState({rodM: event.target.value})
    }
    handleCPRodChange = (event) =>{
      this.setState({CPRod: event.target.value})
    }
    handleNoteChange = (event) =>{
      this.setState({notes: event.target.value})
    }
    handleMWChange = (event) =>{
        this.setState({wellName: event.target.value})
    }

    handleSubmit = event =>{
      event.preventDefault()
      this.createBackendPost()
    }

    createBackendPost = ()=>{
     fetch(wellsAPI,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Response-Type': 'application/json'
        },
        body:JSON.stringify({
          wellID: this.state.wellName,
          rodHeight: this.state.rodHeight,
          corrected: "",
          camlock: this.state.selectedOption,
          depthToWater: "",
          gwe: "",
          gse: "",
          notes: this.state.notes,
          lat:this.state.latitude,
          long: this.state.longitude,
          wells: "",
          amslElev: this.state.AMSL,
          cpRod: this.state.CPRod,
          survey_id: this.props.CurrentSite
        })
      })
    .then(response => response.json())
    .then(response => console.log('Post Complete', response))
    }
    
    // createUI(){
    //    return this.state.users.map((el, i) => (
    //      <div className = 'WellContainer' key={i}>
    //         <label className = 'WellForm1T'>Monitoring Well ID: </label><br></br>
    //         <input className = 'WellForm1'placeholder="Monitoring Well ID (ex. MW-01)" name="wellName" value={el.wellName ||''} onChange={this.handleChange.bind(this, i)} />
    //         <br></br><label className = 'WellForm2T'>Rod Elevation: </label><br></br>
    //         <input className = 'WellForm2' placeholder="Rod Elevation (ex. 3.25)" name="rodHeight" value={el.rodHeight ||''} onChange={this.handleChange.bind(this, i)} />
    //         <label className = 'latT'>Latitude (WGS 84):</label>
    //         <input type ='field' className = 'lat' placeholder="ex. 40.00000" name="latitude" value={el.latitude ||''} onChange={this.handleChange.bind(this, i)} />
    //         <label className = 'longT'>Longitude (WGS 84):</label>
    //         <input type ='field' className = 'long' placeholder="ex. -104.00000" name="longitude" value={el.longitude ||''} onChange={this.handleChange.bind(this, i)} />
    //         <RadioButton radioChange = {this.radioChange} selectedOption = {this.state.selectedOption}></RadioButton>
    //         <label className = 'IssuesT'>Notable Issues: </label> 
    //         <input type ='field' className = 'Issues' placeholder="issues" name="notes" value={el.notes ||''} onChange={this.handleChange.bind(this, i)} />
    //         <input className = 'RemoveButton' type='button' value='Delete' onClick={this.removeClick.bind(this, i)}/>
    //         <input className = 'SubmitButton' type='submit' value= "Submit" onClick={this.HandleSubmit}/>
    //      </div>          
    //    ))
    // }
  

    
    removeClick(i){
       let users = [...this.state.users];
       users.splice(i, 1);
       this.setState({ users });
    }
    
    handleSubmit(event) {
      alert('A name was submitted: ' + JSON.stringify(this.state.users));
      event.preventDefault();
    }
  
    render() {
      return (
          <div className = 'WellElevationContainer'>
            <form className = 'WellElevationForm'onSubmit={this.handleSubmit}>
            <p className = 'FormTitle'>Add Well Measurements:</p>
            <label className = 'ImpTitle'>Corrected AMSL Elevation: </label>
            <input className = 'ImpValue'type = 'text' onChange = {this.handleAMSLChange}></input>
            <label className = 'ImpTitle'>  CP Rod Height: </label>
            <input className = 'ImpValue' type = 'text' onChange = {this.handleCPRodChange}></input>
            {/* {this.createUI()}         */}
            <div className = 'WellContainer'>
                <label className = 'WellForm1T'>Monitoring Well ID: </label><br></br>
                <input className = 'WellForm1'placeholder="Monitoring Well ID (ex. MW-01)" name="wellName" value={this.state.wellName} onChange={this.handleMWChange} />
                <br></br><label className = 'WellForm2T'>Rod Elevation: </label><br></br>
                <input className = 'WellForm2' placeholder="Rod Elevation (ex. 3.25)" name="rodHeight" value={this.state.rodM} onChange={this.handleRodChange} />
                <label className = 'latT'>Latitude (WGS 84):</label>
                <input type ='field' className = 'lat' placeholder="ex. 40.00000" name="latitude" value={this.state.latitude} onChange={this.handleLatChange} />
                <label className = 'longT'>Longitude (WGS 84):</label>
                <input type ='field' className = 'long' placeholder="ex. -104.00000" name="longitude" value={this.state.longitude} onChange={this.handleLongChange} />
                <RadioButton radioChange = {this.radioChange} selectedOption = {this.state.selectedOption}></RadioButton>
                <label className = 'IssuesT'>Notable Issues: </label> 
                <input type ='field' className = 'Issues' placeholder="issues" name="notes" value={this.state.notes} onChange={this.handleNoteChange} />
                <input className = 'RemoveButton' type='button' value='Delete' onClick={this.removeClick}/>
                <input className = 'SubmitButton' type='submit' value= "Submit" onClick={this.HandleSubmit}/>
           </div>    
            {/* <input className = 'Wellbutton'type='button' value='Add MW' onClick={this.addClick.bind(this)}/> */}
            {/* <input className = 'Wellbutton'type="submit" value="Submit" /> */}
        </form>
        </div>
      );
    }
  }
  
//   ReactDOM.render(<App />, document.getElementById('container'));