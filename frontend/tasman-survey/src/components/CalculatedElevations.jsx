import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class CalculatedElevations extends Component{
    

    render() {
        const data = [{
          name: 'MW-01',
          Rod: 26,
          camlock: 'NO',
          corrected: "000.00",
          surfaceElevation: '5280.00',
          date: '1/1/2015',
          issue: {
            description: 'The well has been destroyed'
          }
        },{
    
        }]
        const columns = [{
          Header: props => <span>Date Surveyed:</span>, // Custom header components!
          accessor: 'date'
        },  {
          Header: 'Well ID:',
          accessor: 'name' // String-based value accessors!
        }, {
          Header: 'Rod Elevation:',
          accessor: 'Rod',
          Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
          id: 'friendName', // Required because our accessor is not a string
          Header: 'Corrected Elevation:',
          accessor: 'corrected' // Custom value accessors!
        }, {
          Header: props => <span>Camlock Noted:</span>, // Custom header components!
          accessor: 'camlock'
        },{
          Header: props => <span>Depth To Water</span>, // Custom header components!
          accessor: 'friend.age'
        },{
          Header: props => <span>Groundwater Elevation</span>, // Custom header components!
          accessor: 'friend.age'
        }, {
          Header: props => <span>Ground Surface Elevaton</span>, // Custom header components!
          accessor: 'surfaceElevation'
        }, {
          Header: props => <span>Noted Issues:</span>, // Custom header components!
          accessor: 'issue.description'
          }]
       
        return(
         <div
         className = 'Table'
         >
          <p>Corrected Elevations:</p>
          <ReactTable
          data={data}
          columns={columns}
        />
        </div>)
      }
}