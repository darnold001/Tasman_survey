import React, { Component } from 'react'
import WellElevations from './WellElevations'
import CalculatedElevations from './CalculatedElevations'
const WellAPI = 'http://localhost:3000/wells'
export default class SiteInfo extends Component{
    constructor(){
        super()
        this.state = {
            CurrentSite: "",
            CurrentClient: "",
            data: [],
            PopulatedData:false
                
              
        }
    }

    // NEED TO MAP THROUGH AND CREATE MULTIPLE DATA OBJECTS!!!!!!!!!!!!!!!!!!!!!! LOOK AT DATA STATE AND PROPS

    componentDidMount(){
        fetch(WellAPI)
          .then(response => response.json())
          .then(response => this.setWells(response))
          .then(response => this.mapWells(response))
          // .then(response => console.log('response', response))
      }
      setWells = (wells) =>{
        this.setState({
          wells: wells
        })
        // console.log('setWells', wells)
      }
    
    
      filterResponses = (wells) =>{
        const filteredWells = wells.filter(well =>well.survey_id === this.props.CurrentSite)
        return this.mapWells(filteredWells)
      }
    
      mapWells = () =>{
        console.log('mapWells', this.state.wells)
       return this.state.wells.map(well => this.createTableEntry(well))
      }
    
      createTableEntry = (well) =>{
          var data = []
        this.setState({data:data = [{
            name: well.wellID,
            Rod: well.rodHeight,
            camlock: well.camlock,
            corrected: "000.00",
            latitude: well.lat,
            longitude: well.long,
            surfaceElevation: 'Pend',
            depthToWater: 'Pend',
            groundwaterElevation: 'Pend',
            date: well.updated_at,
            issue: {
              description: well.notes
          }
           }]})
           
      }



render(){
    return(
        <div>
            <WellElevations
                CurrentSite={this.props.CurrentSite}
                CurrentClient={this.state.CurrentClient}
            />
            <CalculatedElevations
            CurrentSite = {this.props.CurrentSite}
            data = {this.props.data}
            /> 
        </div>

        )
    }
}