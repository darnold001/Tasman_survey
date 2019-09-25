import React, {Component} from 'react'
const clientsAPI = 'http://localhost:3000/clients'
const sitesAPI = 'http://localhost:3000/sites'
export default class WelcomeQuestions extends Component{
    constructor(){
        super()
        this.state={
            surveyorName: "",
            ClientSelection: "",
            SiteSelection: "",
            newClient: "",
            region: "",
            clients: [],
            sites: [1],
            siteName: ""
        }
    }
    componentDidMount(){
        fetch(clientsAPI)
        .then(response => response.json())
        .then(response => this.setClientsArray(response))
        .then(response => this.createSelection(response))
    }

    setName = (event) =>{
        this.setState({
            surveyorName: event.target.value
        })
    }
    setSite = (event) =>{
        this.setState({
            siteName: event.target.value
        })
    }
    setClient = (event) =>{
        this.setState({
            newClient: event.target.value
        })
    }

    setClientsArray = input =>{
        this.setState({
            clients: input
        })
        // console.log('SetClientResponse', this.state.clients)
    }

    handleSubmit = event =>{
        event.preventDefault()
        this.getAllSites(event.target.value)
    }

    handleClientChange = event =>{
        this.setState({ClientSelection: event.target.value})
        this.fetchSites(this.state.ClientSelection)
        console.log('Hit Client Change', event.target.value)
    }
    handleRegionSelection = event =>{
        this.setState({region: event.target.value})
    }

    handleSiteChange = event =>{
        this.setState({SiteSelection: event.target.value})
   
    }

    fetchSites=(ID)=>{
        fetch(sitesAPI+`/${ID}`)
        .then(response => response.json())
        .then(response => this.setSiteList(response))
        .then(response => console.log('GET SITES FETCH', this.state.sites))
    }

    setSiteList = (response)=>{
        this.setState({sites: response})
        this.renderSiteOptions()

     
    }

    createSiteSelection = (site) =>{
        return <option className = 'siteSelection' value={site.site_name}>{site.site_name}</option>
    }

    renderSiteOptions = () =>{
        console.log('Got To Rewnder Site Options')
         return(!this.state.sites == []
            ?<form>
                <label>Please enter entire Site Name:</label><br></br>
             <input className = 'welcomeQuestion'type ='text' name = 'site' placeholder = 'i.e. FRI 2-18' onChange = {this.setSite}></input>
             <input type = 'submit' placeholder = 'Add Site' value = 'Add Site' onClick = {this.postSite}></input>
            </form>
            :<div>
                {this.state.sites.map(site => this.createSiteSelection(site))}
                </div>
            )  
     }
     postSite = event =>{
        event.preventDefault()
        fetch(sitesAPI,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Response-Type': 'application/json'
            },
            body:JSON.stringify({
               site_name:this.state.siteName,
               site_number: '00',
               client_id: this.state.client_ID
            })
        })
        .then(response => response.json())
        .then(response => console.log('Post Complete', response))
    }
    createSelection =() =>{
      return this.state.clients.map(client => this.createOption(client))
    }
    createOption=(client)=>{
       return  <option className = 'selection' value={client.id}>{client.name}</option>

    }
    selectSite = () =>{
        console.log('Site Selection Hit')
     return(this.state.sites === []
        ?<form>
           <select>
            {/* {this.createSiteOptions()} */}
            <option value = 'Job Not Listed'> Job Not Listed</option>
           </select>
         </form>
        : <div></div>
     )
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
       return (this.state.SiteSelection === 'Site Not Listed'?
            <div>
            <label className ="welcomeSubLabel"> Please enter the COMPLETE site name below:</label><br></br>
            <input className = 'welcomeQuestion'type ='text' name = 'surveyor' placeholder = ' Site Name (i.e. Fri 2-18)' onChange = {this.setName}></input></div>
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
                            {this.createSelection()}
                            <option className = 'selection' value="Client Not Listed">Client Not Listed</option>
                        </select><br></br>
                        {this.addAClient()}
                        {this.renderSiteOptions()}
             </form>
        </div>
        )
    }

}