import React, {Component} from 'react'
const sitesAPI = 'http://localhost:3000/sites'
const surveysAPI = 'http://localhost:3000/surveys'
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
            siteName: "",
        }
    }
    componentDidMount(){
        fetch(surveysAPI)
        .then(response => response.json())
        .then(response => this.setClientsArray(response))
        // .then(response => this.createSelection(response))
    }
    setName = (event) =>{
        this.setState({
            surveyorName: event.target.value
        })
    }
    setClientsArray = input =>{
        this.setState({
            clients: input
        })
        console.log('Clients Set!', this.state.clients)
    }
    handleSubmit = event =>{
        event.preventDefault()
        this.getAllSites(event.target.value)
    }
    addDate = event =>{
        this.props.addTopDate(event.target.value)        
    }

    handleClientChange = event =>{
        this.setState({ClientSelection: event.target.value})
        this.props.setCurrentClient(event.target.value)
        this.fetchSites(this.state.ClientSelection)
        console.log('Hit Client Change', event.target.value)
    }
    handleRegionSelection = event =>{
        this.setState({region: event.target.value})
    }
    handleSiteChange = event =>{
        this.setState({SiteSelection: event.target.value})
        this.props.setCurrentSite(event.target.value)
   
    }
    fetchSites=(ID)=>{
        fetch(sitesAPI+`/${ID}`)
        .then(response => response.json())
        .then(response => this.setSiteList(response))
        .then(response => console.log('GET SITES FETCH', this.state.sites))
    }
    setSiteList = (response)=>{
        this.setState({sites: response})
        // this.renderSiteOptions()
    }
    createSiteSelection = (site) =>{
        return <option className = 'siteSelection' value={site.site_name}>{site.site_name}</option>
    }
    // renderSiteOptions = () =>{
    //     console.log('Got To Render Site Options')
    //      return(!this.state.sites == []
    //         ?<form>
    //             <label>Please enter entire Site Name: </label>
    //          <input className = 'welcomeQuestion'type ='text' name = 'site' placeholder = 'i.e. FRI 2-18' onChange = {this.setSite}></input>
    //          <br></br><input type = 'submit' placeholder = 'Add Site' value = 'Add Site' onClick = {this.postSite}></input>
    //         </form>
    //         :<div>
    //             {this.state.sites.map(site => this.createSiteSelection(site))}
    //             </div>
    //         )  
    //  }
     postSite = event =>{
        event.preventDefault()
        fetch(surveysAPI,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Response-Type': 'application/json'
            },
            body:JSON.stringify({
                date: this.props.dates,
                client: this.props.CurrentClient,
                site: this.props.CurrentSite,
                surveyor:this.state.surveyorName,
            })
        })
        .then(response => response.json())
        .then(response => console.log('Post Complete', response))
    }
    // createSelection =() =>{
    //   return this.state.clients.map(client => this.createOption(client))
    // }
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
    passCurrentClient = (event) =>{
        this.props.setCurrentClient(event.target.value)
    }

    passCurrentSite = (event) =>{
        this.props.setCurrentSite(event.target.value)
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
         <label className = 'welcomeSubLabel'> Please enter the COMPLETE name of your client:</label>
             <input className = 'welcomeQuestion' type ='text' name = 'client' placeholder = 'Client Name' onChange = {this.passCurrentClient}></input><br></br>
             <label className = 'welcomeSubLabel'> Please enter the COMPLETE name of your site:</label>
             <input className = 'welcomeQuestion' type ='text' name = 'site' placeholder = 'Site Name' onChange = {this.passCurrentSite}></input><br></br>
             <input type = 'submit' placeholder = 'Add Site' value = 'Add Site' onClick = {this.postSite}></input>
        </form>
         : <div></div>
        )
    }

    render(){
        return(
            <div className = 'WelcomeContainer'>
             <form onSubmit ={this.handleSubmit}>
               <label className ="welcomeLabel"> Please Enter The Name of all Surveyors on Site:</label>
               <input className = 'welcomeQuestion'type ='text' name = 'surveyor' placeholder = 'surveyors name' onChange = {this.setName}></input><br></br>
                <label className ="welcomeQuetion"> Please Enter The Date of the Survey:</label>
                    <input className = 'welcomeLabel' type = 'date' value = {this.state.value} onChange = {this.addDate}></input><br></br>
                        <label className ="welcomeLabel"> Please Select your Client:</label>
                        <select className = 'welcomeSelection'  value = {this.state.value} onChange = {this.handleClientChange}>
                            <option className = 'selection' value =""> </option>
                            {/* {this.createSelection()} */}
                            <option className = 'selection' value="Client Not Listed">Client Not Listed</option>
                        </select><br></br>
                        {this.addAClient()}
                        {/* {this.renderSiteOptions() */}
                        
             </form>
        </div>
        )
    }

}