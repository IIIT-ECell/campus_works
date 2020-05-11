import React,{ Component } from "react";
import NavCompany from './NavCompany';
import './App.css';
import axios from "axios";

class CenteredText extends React.Component {
    render() {
        return (
            <div className="container-fluid my-5 text-center">
                <div className="row">
                    <div className="col">
                        <h1>{ this.props.text }</h1>
                    </div>
                </div>
            </div>
        )
    }
}
class CompanyProfile extends React.Component{
    constructor(props) {
        super(props);
        this.formData = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(event){
        event.preventDefault();

        axios({
            method:"PUT",
            url:"https://campusworks.pythonanywhere.com/company",
            data:this.formData,
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((response)=>{
            alert(response.data["message"]);
        })
    }


    render(){
        return(
            <div>
                <NavCompany></NavCompany>
                <div className="container my-5">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2 col-form-label font-weight-bold">Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="name" id="name" placeholder="ABC Inc." onChange={this.handleChange} disabled/>
                                <small className="form-text text-muted">Company's name</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label font-weight-bold">Email address</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" name="email" id="email" placeholder="joe@email.com" onChange={this.handleChange} disabled/>
                                <small className="form-text text-muted">Contact Email Address</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Contact Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Joe Stark" name="contact_name" id="poc" onChange={this.handleChange} disabled></input>
                                <small className="form-text text-muted">Contact Name</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">About</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" placeholder="Describe your company's projects, values, and tech stack" id="about" name="about" onChange={this.handleChange} disabled></textarea>
                                <small className="form-text text-muted">About the Organization</small>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>View</button>

                    </form>
                </div>
            </div>
        )
    }
}
export default CompanyProfile;