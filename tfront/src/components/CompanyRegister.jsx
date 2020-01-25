import React from 'react';
import './App.css';
import axios from 'axios';
import Nav1 from './Nav1';

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

export default class CompanyRegister extends React.Component {
    constructor(props) {
        super(props);
        this.formData = {};
        this.state = { issuccess: false, issubmit: false };
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
            method:"POST",
            url:"http://localhost:8000/company",
            data:this.formData,
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((response)=>{
            alert(response.data["message"]);

            if(response.data["success"]=="True") {
                window.location.replace("http://localhost:3000/login");
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
                            This is the official registration portal for the Campus Works initiative by E-Cell, IIIT Hyderabad. The portal is currently under construction. We look forward to helping you recruit the best IIIT has to offer.
                        </div>
                    </div>
                </div>


                <div className="container my-5">
                    <form>

                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2 col-form-label font-weight-bold">Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="name" id="name" placeholder="ABC Inc." onChange={this.handleChange} required/>
                                <small className="form-text text-muted">This is the Company's name</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label font-weight-bold">Email address</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" name="email" id="email" placeholder="joe@email.com" onChange={this.handleChange} required/>
                                <small className="form-text text-muted">This is used to log into the portal and create job posting, and manage them</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" name="password" id="password" onChange={this.handleChange} required></input>
                                <small className="form-text text-muted">This password can be changed once the portal is up</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Contact Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Joe Stark" name="contact_name" id="poc" onChange={this.handleChange} required></input>
                                <small className="form-text text-muted">The point of contact for campus works/will manage the account on company's behalf</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Phone Number</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" placeholder="1234567890" id="phone_number" name="phone_number" onChange={this.handleChange} required></input>
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
                                <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                <label className="form-check-label" htmlFor="gridCheck">
                                    I have read and understood the <a href={process.env.PUBLIC_URL + '/assets/terms.pdf'} target="_blank" className="font-weight-bold text-danger">terms and conditions</a> in its entirety
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark w-100" onSubmit={this.handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>


        );
    }
}
