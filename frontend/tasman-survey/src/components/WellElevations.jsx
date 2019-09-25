 import React  from 'react'
 import '../components/WellElevations.css'
export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          users: [{wellName: "", rodHeight: ""}]
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    addClick(){
      this.setState(prevState => ({ 
          users: [...prevState.users, { wellName: "", rodHeight: "" }]
      }))
    }
    
    createUI(){
       return this.state.users.map((el, i) => (
         <div key={i}>
            <input placeholder="Monioring WelL ID (ex. MW-01)" name="wellName" value={el.wellName ||''} onChange={this.handleChange.bind(this, i)} />
            <input placeholder="Rod Elevation (ex. 3.25)" name="rodHeight" value={el.rodHeight ||''} onChange={this.handleChange.bind(this, i)} />
            <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
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
        <form className = 'WellElevationForm'onSubmit={this.handleSubmit}>
            <p>Add Well Data:</p>
            {this.createUI()}        
            <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
            <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  
//   ReactDOM.render(<App />, document.getElementById('container'));