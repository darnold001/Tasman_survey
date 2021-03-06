import React, {Component} from 'react'
// const sitesAPI = 'http://localhost:3000/sites'
const surveysAPI = 'http://localhost:3000/surveys'
export default class WelcomeQuestions extends Component{
    constructor(){
        super()
        this.state={
            surveyorName: "",
            ClientSelection: "",
            newClient: "",
            sites: [],
            siteSelected: false,
            sitesFiltered: false,
            siteName: "",
            FilteredSites: []
        }
    }
    componentDidMount(){
        fetch(surveysAPI)
        .then(response => response.json())
        .then(response => this.setSiteList(response))
    }

    passCurrentClient = (event) =>{
        this.props.setCurrentClient(event.target.value)
    }

    passCurrentSite = (event) =>{
        this.props.setCurrentSite(event.target.value)
    }
    setName = (event) =>{
        this.setState({
            surveyorName: event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault()
        this.getAllSites(event.target.value)
    }
    addDate = event =>{
        this.props.addTopDate(event.target.value)        
    }
    addCurrentSite = (event) =>{
        this.props.setCurrentSite(event.target.value)
        this.props.setSiteID(event.target.value)
        console.log('addCurrentSite', event.target.id)
    }

    handleClientChange = event =>{
        this.setState({ClientSelection: event.target.value})
        this.props.setCurrentClient(event.target.value)
        this.props.setSiteID(event.target.id)
        this.setState({siteSelected: true})
        this.filterSites()
        console.log('Hit Client Change', event.target.value)
    }
    handleRegionSelection = event =>{
        this.setState({region: event.target.value})
    }

    filterSites = () =>{
        const FilteredLocs = this.state.sites.filter(site =>site.client === this.state.ClientSelection)
       return this.mapSites(FilteredLocs)
    }

    setSiteList = (response)=>{
        this.setState({sites: response})
    }
    
    mapSites =(sites)=>{
        return sites.map(site => this.createSiteSelection(site))
    }

    createSiteSelection = (site) =>{
        return <option className = 'siteSelection' value={site.id}>{site.site}</option>
    }

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
        .then(response =>{this.props.setSiteID(response.id)})
        .then(response => console.log('Post Complete', response))
    }
    createSelection =() =>{
        return this.state.sites.map(client => this.createOption(client)
        )
    }
    createOption=(name)=>{
       return  <option className = 'selection' id ={name.id} value={name.client}>{name.client}</option>
    }
 
    addASite = () =>{
       return (this.state.SiteSelection === 'Site Not Listed'?
            <div>
            <label className ="welcomeSubLabel"> Please enter the COMPLETE site name below:</label><br></br>
            <input className = 'welcomeQuestion'type ='text' name = 'surveyor' placeholder = ' Site Name (i.e. Fri 2-18)' onChange = {this.setName}></input></div>
             : <div></div>)
    }

    renderSites = () =>{
        return(this.state.siteSelected == false?
            <div></div>
            :<form>
              <label> Please select your site: </label>
                <select onChange = {this.addCurrentSite}>
                    <option value = ""></option>
                    {this.filterSites()}
                    <option value = 'site Not Listed'> Job Not Listed</option>
                </select>
            </form>)
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
                        <label className ="welcomeLabel"> Please Select your Client: </label>
                        <select className = 'welcomeSelection'  value = {this.state.ClientSelection} onChange = {this.handleClientChange}>
                            <option className = 'selection' > </option>
                            {this.createSelection()}
                            <option className = 'selection' value="Client Not Listed">Client Not Listed</option>
                        </select><br></br>
                        {this.renderSites()}
                        {this.addAClient()}    
             </form>
        </div>
        )
    }

}