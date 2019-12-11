import React, { Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import './Landing.css'

class Landing extends Component{
    render(){
        return(
            <body>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Campus Works</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Sign in</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div id="intro" class="view">
                <div class="mask rgba-black-strong">
                    <div class="container-fluid d-flex align-items-center justify-content-center h-100">
                        <div class="row d-flex justify-content-center text-center">
                            <div class="col-md-10">
                                <h2 class="display-4 font-weight-bold white-text pt-5 mb-2">Campus Works</h2>
                                <hr class="hr-light"/>
                                <h4 class="white-text my-4">Internships made easy!</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </body>
        )
    }
}
export default Landing;