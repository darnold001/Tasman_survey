import React, {Component} from 'react'
export default class RadioButtons extends React.Component {

  render() {
    return (
      <div className = "Radio">
        <label> CamLock Present?</label><br></br>
        <input type="radio"
               value="Yes"
               checked={this.props.selectedOption === "Yes"}
               onChange={this.props.radioChange} />Yes

        <input type="radio"
               value="No"
               checked={this.props.selectedOption === "No"}
               onChange={this.props.radioChange}/>No
        
        {/* <h3>this.state.selectedOption: {this.state.selectedOption}</h3> */}
      </div> 
    );
  }
}