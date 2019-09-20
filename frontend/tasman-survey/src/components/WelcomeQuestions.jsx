import React, {Component} from 'react'
const clientsAPI = 'http://localhost:3000/clients'
export default class WelcomeQuestions extends Component{
    constructor(){
        super()
        this.state={
            surveyorName: "",
            ClientSelection: "",
            SiteSelection: "",
            newClient: "",
            region: ""
        }
    }


    setName = (event) =>{
        this.setState({
            surveyorName: event.target.value
        })
    }

    setClient = (event) =>{
        this.setState({
            newClient: event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault()
        this.getAllSites(event.target.value)
    }

    handleClientChange = event =>{
        this.setState({ClientSelection: event.target.value})
    }
    handleRegionSelection = event =>{
        this.setState({region: event.target.value})
    }

    handleSiteChange = event =>{
        this.setState({SiteSelection: event.target.value})
    }

    getAllSites = (name) =>{
        return fetch(clientsAPI`/${name}`)
                 .then(response =>response.json())
                 .then(response =>console.log('Sites', response))
    }

    postClient = event =>{
        event.preventDefault()
        fetch(clientsAPI,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Response-Type': 'application/json'
            },
            body:JSON.stringify({
                name : this.state.newClient,
                region: this.state.region,
            })
        })
        .then(response => response.json())
        .then(response => console.log('Post Complete', response))
    }

    addASite = () =>{
       return  (this.state.SiteSelection === 'Site Not Listed'?
            <div>
            <label className ="welcomeSubLabel"> Please enter the COMPLETE site name below:</label><br></br>
            <input className = 'welcomeQuestion'type ='text' name = 'surveyor' placeholder = 'Site Name (i.e. Fri 2-18)' onChange = {this.setName}></input></div>
             : <div></div>)
    }
    addAClient = () =>{
        return (this.state.ClientSelection === 'Client Not Listed'?
        <form>
        <label className = 'welcomeSubLabel'> Please enter the COMPLETE name of your Client below:</label><br></br>
        <input className = 'welcomeQuestion' type ='text' name = 'site' placeholder = 'Client Name' onChange = {this.setClient}></input>
        <br></br><label className = 'welcomeSubLabel'> Please select your working region:</label><br></br>
        <select className = 'welcomeSelection'  value = {this.state.value} onChange = {this.handleRegionSelection}>
                            <option className = 'selection' value =""> </option>
                            <option className = 'selection' value="Colorado Region">Colorado Region</option>
                            <option className = 'selection' value="New Mexico / Texas Region">New Mexico/Texas Region</option>
                            <option className = 'selection' value="Montana Region">Montana Region</option>
                            <option className = 'selection' value="Florida Region">Florida Region</option>
                         </select><br></br>
        <input className = 'welcomeSubmit' type = 'submit'onClick = {this.postClient}></input>
        </form>
         : <div></div>
        )
    }


    render(){
        return(
            <div className = 'WelcomeContainer'>
             <form onSubmit ={this.handleSubmit}>
                <label className ="welcomeLabel"> Please Enter The Name of all Surveyors on Site:</label><br></br>
                    <input className = 'welcomeQuestion'type ='text' name = 'surveyor' placeholder = 'surveyors name' onChange = {this.setName}></input><br></br>
                        <label className ="welcomeLabel"> Please Select your Client:</label><br></br>
                        <select className = 'welcomeSelection'  value = {this.state.value} onChange = {this.handleClientChange}>
                            <option className = 'selection' value =""> </option>
                            <option className = 'selection' value="Oxy/APC">Oxy/APC</option>
                            <option className = 'selection' value="PDC">PDC Energy</option>
                            <option className = 'selection' value="DCP Midstream">DCP Midstream</option>
                            <option className = 'selection' value="Suncor">Suncor</option>
                            <option className = 'selection' value="OPS">OPS</option>
                            <option className = 'selection' value="Client Not Listed">Client Not Listed</option>
                         </select><br></br>
                            {this.addAClient()}
                         {/* <label className ="welcomeLabel"> Please Select Your Site:</label><br></br>
                         <select className = 'welcomeSelection'  value = {this.state.value} onChange = {this.handleSiteChange}>
                            <option className = 'selection' value =""> </option>
                            <option className = 'selection' value="Anadarko">Oxy/APC</option>
                            <option className = 'selection' value="PDC">PDC Energy</option>
                            <option className = 'selection' value="DCP Midstream">DCP Midstream</option>
                            <option className = 'selection' value="Suncor">Suncor</option>
                            <option className = 'selection' value="OPS">OPS</option>
                            <option className = 'selection' value="Site Not Listed">Site Not Listed</option>
                         </select><br></br>
                            {this.addASite()} */}
                    {/* <input className = 'welcomeQuestionButton'type ='submit' name = 'Get Sites' placeholder = 'Get Sites' onClick = {this.handleSubmit}></input> */}
                </form>
            </div>
        )
    }

}