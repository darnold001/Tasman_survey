import React, { Component } from 'react'
import WellElevations from './WellElevations'
import CalculatedElevations from './CalculatedElevations'
const WellAPI = 'localhost:3000/wells'
export default class SiteInfo extends Component{
    constructor(){
        super()
        this.state = {
            CurrentSite: "",
            CurrentClient: ""
        }
    }

componentDidMount = () =>{

}

GetWells = (id) =>{
    fetch(WellAPI/`${id}`)
        .then(response => response.json())
        .then(response => console.log('Site Wells!', response))
}

render(){
    return(
        <div>
            <WellElevations
                CurrentSite={this.state.CurrentSite}
                CurrentClient={this.state.CurrentClient}
            />
            <CalculatedElevations/> 
        </div>

        )
    }
}