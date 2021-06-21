import React from 'react';
import './App.css';
import axios from 'axios';
import Nav1 from './Nav1';

export default class CompanyRegister extends React.Component {
    constructor(props) {
        super(props);
        this.formData = {};
        this.state = {issuccess: false, issubmit: false, isvalid: false, formSubmitted: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;

        if (event.target.type === 'checkbox') {
            this.setState({isvalid: event.target.checked})
        }
    }

    handleSubmit(event) {
        alert("Registrations for Campus Works have Ended.");
        return;
        event.preventDefault();
        this.setState({formSubmitted: true});
        if (!this.state.isvalid) {
            alert("Agree to Terms and Conditions to create a company");
            this.setState({formSubmitted: false});
            return;
        }

        axios({
            method: "POST",
            url: "https://campusworks.pythonanywhere.com/company",
            data: this.formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            alert(response.data["message"]);

            if (response.data["success"] === true) {
                window.location.replace("https://ecell.iiit.ac.in/cworks/login");
            }
            else{
                this.setState({formSubmitted: false});
            }
        })
    }

    render() {
        return (
            <div>
                <Nav1></Nav1>
                <header className="top-index h-50">
                    <div className="container-fluid h-100">
                        <div className="row h-100">
                            <div className="col align-self-center text-center">
                                <h1 className="my-5 text-white">
                                    Register as a Company Now!
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container my-5 text-center">
                    <div className="row">
                        <div className="col">
                            This is the official registration portal for the Campus Works initiative by E-Cell, IIIT Hyderabad. We look forward to helping you recruit the best IIIT has to offer.
                        </div>
                    </div>
                </div>


                <div className="container my-5">
                    <form onSubmit={this.handleSubmit}>
                        <p class="w-100 p-1" style={{"color":"red", "text-align":"center"}}>Note: Registrations have Ended.</p>    
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2 col-form-label font-weight-bold">Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="name" id="name" placeholder="Enter Company Name" onChange={this.handleChange} required />
                                <small className="form-text text-muted">This is the Company's name</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label font-weight-bold">Email address</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Enter Email Address of POC" onChange={this.handleChange} required />
                                <small className="form-text text-muted">This is used to log into the portal and create job posting, and manage them</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" placeholder="Enter Password" name="password" id="password" onChange={this.handleChange} required></input>
                                <small className="form-text text-muted">This password can be changed once the portal is up</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Contact Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Enter Name of POC" name="contact_name" id="poc" onChange={this.handleChange} required></input>
                                <small className="form-text text-muted">The point of contact for campus works/will manage the account on company's behalf</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Phone Number</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" placeholder="Enter Contact Number" id="phone_number" name="phone_number" onChange={this.handleChange} required></input>
                                <small className="form-text text-muted">Number is not displayed on the website. For internal contact purposes only</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">About</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" placeholder="Describe your company's projects, values, and tech stack" id="about" name="about" onChange={this.handleChange} required></textarea>
                                <small className="form-text text-muted">This information will be visible to applicant when they view company information</small>
                            </div>
                        </div>

                        <div className="form-group my-5">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="check" onChange={this.handleChange} required />
                                <label className="form-check-label" htmlFor="check">
                                    I have read and understood the <a href={process.env.PUBLIC_URL + '/assets/terms.pdf'} target="_blank" className="font-weight-bold text-danger">terms and conditions</a> in its entirety
                                </label>
                            </div>
                        </div>

                        {this.state.formSubmitted === false && <button type="submit" className="btn btn-primary w-100" style={{"background-color":"black","border-color":"#1a1a1a"}} onClick={this.handleSubmit}>Submit</button>}                    
                    </form>
                </div>
            </div>


        );
    }
}
