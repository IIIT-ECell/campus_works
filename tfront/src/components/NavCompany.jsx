import React,{Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavCompany extends Component{
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                        <Nav.Link><Link to={"/company/home"} className="text-white">Register</Link></Nav.Link>
                        <Nav.Link><Link to={"/login"} className="text-white">Logout</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default NavCompany;