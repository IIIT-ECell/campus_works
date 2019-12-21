import React, { Component} from 'react';
import './Landing.css'
import {Button, ButtonToolbar} from 'react-bootstrap';
import Hero from '../assets/hero.png'

class Landing extends Component{
    render() {
        return(
            <div id="intro" className="vh-100">
                <div className="mask d-flex justify-content-center align-items-center">
                    <div className="container d-flex text-center">
                        <div className="row bg-white p-5 rounded">
                            <div className="col-md-6 my-auto">
                                <h2 className="display-4 font-weight-bold">Campus Works</h2>
                                <h5>Connecting Students with Startups. Internships have never been easier</h5>
                                <Button variant="btn btn-dark" size="lg" href={ this.props.baseUrl + "/register/company" }>Register as Company</Button>
                                <br className="my-4"/>
                            </div>
                            <div className="order-lg-first w-50 mx-auto">
                                <img className="img-fluid" src={ Hero }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Landing;
