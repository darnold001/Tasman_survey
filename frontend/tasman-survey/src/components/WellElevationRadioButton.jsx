import React, {Component} from 'react'
export default class RadioButton extends Component{
    constructor(){
        super()
        this.state = {
            selectedOption:""
        }
    }

    render(){
        return(
            <form className = 'Radio'>
            <label> CamLock Present?</label><br></br>
              <label>
                <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} />
                Yes
              </label>
              <label>
                <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} />
                No
              </label>
          </form>
        )
    }
}