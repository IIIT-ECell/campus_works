import React,{ Component } from "react";
import NavCompany from './NavCompany';
import NavStudent from './NavStudent';
import { Form } from "react-bootstrap";
import './App.css';
import axios from "axios";

class CompanyProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {formSubmitted:false,company:{},user:{}}
        this.formData = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.state);
        axios.get("https://campusworks.pythonanywhere.com/profile/company",{
            params: {
                "token":localStorage.getItem("token"),
                "company_id":this.props.match.params.company_id,
            },
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            console.log(this.state);
            if(res.data.success==true){
                this.setState({company:res.data.company.fields});
                this.setState({user:res.data.user.fields});
                console.log(this.state);
            }
        });
    }

    handleChange(event){
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({formSubmitted:true});
        var form_data = new FormData();
        var keys = Object.keys(this.formData);
        console.log(keys);
        for (var i in keys){
            form_data.append(keys[i],this.formData[keys[i]]);
        }
        // form_data.append()
        axios.put("https://campusworks.pythonanywhere.com/company",
            form_data,
            {
                headers:{
                    'Content-Type':'multipart/form-data'
                }  
            }
        ).then((res)=>{
            alert(res.data);
            this.setState({formSubmitted:false});
        })
    }


    render(){
        if(this.state.company){
        return(
            <div>
                {localStorage.getItem('type')==1 && <NavStudent></NavStudent>}
                {localStorage.getItem('type')==2 && <NavCompany></NavCompany>}
                <div className="container my-5">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2 col-form-label font-weight-bold">Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="name" id="name" placeholder="ABC Inc." onChange={this.handleChange} disabled value={this.state.user.first_name}/>
                                <small className="form-text text-muted">Company's name</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label font-weight-bold">Email address</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" name="email" id="email" placeholder="joe@email.com" onChange={this.handleChange} disabled value={this.state.user.email}/>
                                <small className="form-text text-muted">Contact Email Address</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Contact Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Joe Stark" name="contact_name" id="poc" onChange={this.handleChange} disabled value={this.state.company.poc}></input>
                                <small className="form-text text-muted">Contact Name</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">About</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" placeholder="Describe your company's projects, values, and tech stack" id="about" name="about" onChange={this.handleChange} disabled value={this.state.company.about}></textarea>
                                <small className="form-text text-muted">About the Organization</small>
                            </div>
                        </div>
                        {this.state.formSubmitted===false && <button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>Submit</button>}

                    </form>
                </div>
            </div>
        )
    }
    else {
        return <p>Company Doesn't Exist.</p>
    }
}
}
export default CompanyProfile;