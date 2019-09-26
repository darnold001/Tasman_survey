 import React  from 'react'
 import '../components/WellElevations.css'
 import RadioButton from '../components/WellElevationRadioButton'
export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          users: [{wellName: "", rodHeight: ""}],
          elevation: 0
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    addClick(){
      this.setState(prevState => ({ 
          users: [...prevState.users, { wellName: "", rodHeight: "" }]
      }))
    }

    addElevation = (event) =>{
        this.setState({elevation: event.target.value})
    }
    
    createUI(){
       return this.state.users.map((el, i) => (
         <div className = 'WellContainer' key={i}>
            <label className = 'WellForm1T'>Monitoring Well ID:</label><br></br>
            <input className = 'WellForm1'placeholder="Monitoring Well ID (ex. MW-01)" name="wellName" value={el.wellName ||''} onChange={this.handleChange.bind(this, i)} />
            <br></br><label className = 'WellForm2T'>Rod Elevation:</label><br></br>
            <input className = 'WellForm2' placeholder="Rod Elevation (ex. 3.25)" name="rodHeight" value={el.rodHeight ||''} onChange={this.handleChange.bind(this, i)} />
            <RadioButton></RadioButton>
            <label className = 'IssuesT'>Notable Issues:</label> 
            <input type ='field' className = 'Issues' placeholder="issues" name="rodHeight" value={el.rodHeight ||''} onChange={this.handleChange.bind(this, i)} />
            <input className = 'RemoveButton' type='button' value='Delete' onClick={this.removeClick.bind(this, i)}/>
         </div>          
       ))
    }
  
    handleChange(i, e) {
       const { name, value } = e.target;
       let users = [...this.state.users];
       users[i] = {...users[i], [name]: value};
       this.setState({ users });
    }
    
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
            <input className = 'ImpValue'type = 'text' value = 'i.e. 4350.20' onChange = {this.addElevation}></input>
            <label className = 'ImpTitle'>CP Rod Height: </label>
            <input className = 'ImpValue' type = 'text' value = 'i.e. 4350.20' onChange = {this.addElevation}></input>
            {this.createUI()}        
            <input className = 'Wellbutton'type='button' value='Add MW' onClick={this.addClick.bind(this)}/>
            <input className = 'Wellbutton'type="submit" value="Submit" />
        </form>
        </div>
      );
    }
  }
  
//   ReactDOM.render(<App />, document.getElementById('container'));