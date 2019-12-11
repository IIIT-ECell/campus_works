import React from 'react'
import pattern from './img/bg.png'
import './App.css';

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
        this.state = { issuccess: false, issubmit: false }
    }

    submit = e => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;

            console.log(xhr.status)

          if (xhr.status === 200) {
            form.reset();
            this.setState({ issuccess: true, issubmit: true });
          } else {
            this.setState({ issubmit: true });
          }
        };
        xhr.send(data);        
    }

    render() {
        return (
            <React.Fragment>
                <header className="top-index h-50">
                    <div className="container-fluid h-100">
                        <div className="row h-100">
                            <div className="col align-self-center text-center">
                                <h1 className="my-5 text-white">
                                    <b>Register as a Company Now!</b>
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

                { this.state.issubmit == true ? this.state.issuccess == true ? <CenteredText text="Registration Done!"/> : <CenteredText text="Registration Failed. Retry"/> :

                <div className="container my-5">
                    <form onSubmit={this.submit} action="https://formspree.io/xbjlbnaz" method="POST">

                        <div className="form-group row">
                            <label for="name" className="col-sm-2 col-form-label font-weight-bold">Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" id="name" placeholder="ABC Inc." required/>
                                <small className="form-text text-muted">This is the Company's name</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="email" className="col-sm-2 col-form-label font-weight-bold">Email address</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email" placeholder="joe@email.com" required/>
                                <small className="form-text text-muted">This is used to log into the portal and create job posting, and manage them</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" required></input>
                                <small className="form-text text-muted">This password can be changed once the portal is up</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Contact Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Joe Stark" required></input>
                                <small className="form-text text-muted">The point of contact for campus works/will manage the account on company's behalf</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Phone Number</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" placeholder="1234567890" required></input>
                                <small className="form-text text-muted">Number is not displayed on the website. For internal contact purposes only</small>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">About</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" placeholder="Describe your company's projects, values, and tech stack" required></textarea>
                                <small className="form-text text-muted">This information will be visible to applicant when they view company information</small>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>

                }

                <div className="container-fluid pink-purple-gradient-text">
                    <div className="row">
                        <div className="col text-right px-5">
                            <h2 className="py-4 font-weight-light font-italic text-white">Connecting IIIT's finest with you</h2>
                        </div>
                    </div>
                </div>

                <div className="container-fluid bg-dark">
                    <div className="row">
                        <div className="col text-center px-5">
                            <h5 className="py-5 font-weight-bold text-white">An E-Cell IIIT-H Initiative</h5>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}