import React,{Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Nav1.css'

class Nav1 extends Component{
    render(){
        return(
            <Navbar collapseOnSelect expand="md" variant="dark" sticky="top">
                <Navbar.Brand className="nav-logo">
                <Link to={"/"}>
                <img
                    src={ process.env.PUBLIC_URL + "/logo.png" }
                    width="60"
                    className="d-inline-block align-top"
                    alt="Campus Works logo" />{' '}
                </Link>
                    <div class="nav-text">Campus <b><span className="nav-logo-gradient">Works</span></b></div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto text-white">
                        <Nav.Link><Link to={"/register"} className="text-white"><FontAwesomeIcon icon="user-plus"/> Register</Link></Nav.Link>
                        <Nav.Link><Link to={"/login"} className="text-white"><FontAwesomeIcon icon="sign-in-alt"/> Login</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Nav1;