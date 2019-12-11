import React, { Component} from 'react';
import './Landing.css'
import {Button, ButtonToolbar} from 'react-bootstrap';
class Landing extends Component{
    render(){
        return(
            <div id="intro" className="vh-100">
                <div className="mask d-flex justify-content-center align-items-center">
                    <div className="container text-center">
                        <div className="row bg-white p-5 rounded">
                            <div className="col-md-12">
                                <h2 className="display-4 font-weight-bold">Campus Works</h2>
                                <hr className="hr-light"/>
                                <h4 className="my-4">INTERNSHIPS MADE EASY</h4>
                                <Button variant="outline-dark" size="lg" href="/register/company">Register as Company</Button>
                                <br className="my-4"/>
                                <Button variant="outline-dark" size="lg" disabled>Register as Student</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Landing;