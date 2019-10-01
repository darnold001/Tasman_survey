import React, { Component } from 'react'
import WellElevations from './WellElevations'
import CalculatedElevations from './CalculatedElevations'
export default class SiteInfo extends Component{
    constructor(){
        super()
        this.state = {
            CurrentSite: "",
            CurrentCLient: ""
        }
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